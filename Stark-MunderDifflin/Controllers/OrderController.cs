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

        [HttpGet]
        public IActionResult Get()
        {
            List<Order> orders = _orderRepo.GetAllOrders();
            if (orders == null) return NotFound();
            return Ok(orders);
        }
       


        // GET api/<OrderController>/5
        [HttpGet("{orderId}")]
        public IActionResult Get(int orderId)
        {
            List<PaperOrderItem>? items = _orderItemRepo.GetAllItemsByOrderId(orderId);
            if (items == null) return NotFound();
            return Ok(items);

        }

        [HttpGet("Customer/{uid}")]
        public IActionResult GetOrderByUID(string uid)
        {
            List<Order>? customerOrders = _orderRepo.GetAllOrdersByUID(uid);
            if (customerOrders == null) return NotFound();
            return Ok(customerOrders);
        }

        // POST api/<OrderController>
        [HttpPost]
        public IActionResult PostOrder([FromBody] Order newOrder)
        {
            if (newOrder == null)
            {
                return NotFound();
            }
            else
            {
                _orderRepo.AddOrder(newOrder);
                return Ok(newOrder);
            }


        }

        // POST api/<OrderController>
        [HttpPost("OrderItems")]
        public IActionResult PostOrderItem([FromBody] OrderItem newOrderItem)
        {
            if (newOrderItem == null)
            {
                return NotFound();
            } else
            {
                _orderItemRepo.AddOrderItem(newOrderItem);
                return Ok(newOrderItem);    
            }
            

        }


        // PUT api/<OrderController>/5
        [HttpPut("OrderItems/{id}")]
        public IActionResult Put(int id, [FromBody] PaperOrderItem item)
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

        // PUT api/<OrderController>/5
        [HttpPut("Close/{id}")]
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
        [HttpDelete("{orderId}")]
        public void Delete(int orderId)
        {
            _orderRepo.DeleteOrder(orderId);
        }
        
        // DELETE api/<OrderController>/5/1
        [HttpDelete("{orderId}/(paperId")]
        public void DeleteItem(int orderId, int paperId)
        {
            _orderItemRepo.DeleteOrderItem(orderId, paperId);
        }
    }
}
