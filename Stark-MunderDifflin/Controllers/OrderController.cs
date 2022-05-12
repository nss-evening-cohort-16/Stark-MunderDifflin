using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stark_MunderDifflin.Models;
using Stark_MunderDifflin.Repos;
using System.Text.RegularExpressions;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Stark_MunderDifflin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderItemRepo _orderItemRepo;

        private readonly IOrderRepo _orderRepo;

        public OrderController(IOrderRepo orderRepo, IOrderItemRepo orderItemRepo)
        {
            _orderRepo = orderRepo;
            _orderItemRepo = orderItemRepo;
        }

        // GET: api/<OrderController>/Cart
        [Authorize]
        [HttpGet("Cart")]
        public IActionResult GetCart()
        {
            var uid = User.FindFirst(Claim => Claim.Type == "user_id").Value.ToString();
            var order = _orderRepo.GetOpenOrderByUID(uid);
            if (order != null)
            {
                var orderId = order.Id;
                Cart cart = new Cart()
                {
                    CartItems = _orderItemRepo.GetAllItemsByOrderId(orderId),
                    CartId = order.Id
                };

                return Ok(cart);
            }
            else
            {
                int newOrderId = _orderRepo.AddNewOrder(uid);
                Cart cart = new Cart()
                {
                    CartItems = new List<PaperOrderItem>(),
                    CartId = newOrderId
                };

                return Ok(cart);
            }
        }

        //GET api/<OrderController>/5
        [Authorize]
        [HttpGet("{orderId}")]
        public IActionResult GetOrderItems(int orderId)
        {
            var uid = User.FindFirst(Claim => Claim.Type == "user_id").Value.ToString();
            List<PaperOrderItem>? items = _orderItemRepo.GetAllItemsByOrderId(orderId);
            if (items == null) return NotFound();
            string orderUID = _orderRepo.GetOrderUIDByID(orderId);
            if(uid == orderUID) return Ok(items);
            else return Unauthorized();

        }
        [Authorize]
        [HttpGet("Customer")]
        public IActionResult GetOrderByUID()
        {
            var uid = User.FindFirst(Claim => Claim.Type == "user_id").Value.ToString();
            List<Order>? customerOrders = _orderRepo.GetAllOrdersByUID(uid);
            if (customerOrders == null) return NotFound();
            return Ok(customerOrders);
        }

        [Authorize]
        [HttpPost("Add")]
        public IActionResult AddToCart([FromBody] OrderItem item)
        {
            var uid = User.FindFirst(Claim => Claim.Type == "user_id").Value.ToString();
            var order = _orderRepo.GetOpenOrderByUID(uid);
            if(order == null)
            {
               int id = _orderRepo.AddNewOrder(uid);
                item.OrderId = id;
                _orderItemRepo.AddOrderItem(item);
                return Ok(item);

            }
            else
            {
                item.OrderId = order.Id;
                OrderItem? existingItem = _orderItemRepo.OrderItemExists(item.PaperId, item.OrderId);
                if (existingItem == null)
                {
                _orderItemRepo.AddOrderItem(item);
                return Ok(item);
                }
                else
                {
                    int newQuantity = existingItem.Quantity + item.Quantity;
                    _orderItemRepo.UpdateOrderItemQuantity(existingItem.Id, newQuantity);
                    return Ok(item);
                }

            }
        }

        // PUT api/<OrderController>/5
        [Authorize]
        [HttpPut("OrderItems/{id}")]
        public IActionResult UpdateQuantity(int id, [FromBody] PaperOrderItem item)
        {
            try
            {
                _orderItemRepo.UpdateOrderItemQuantity(id, item.Quantity);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
        [Authorize]
        // GET api/<OrderController>/5
        [HttpGet("Close/{id}")]
        public IActionResult CloseOrder(int id)
        {
            try
            {
                _orderRepo.CloseOrder(id);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        // DELETE api/<OrderController>/5
        [Authorize]
        [HttpDelete("DeleteCartItem/{id}")]
        public void Delete(int id)
        {
            _orderItemRepo.DeleteOrderItem(id);
        }
    }
}
