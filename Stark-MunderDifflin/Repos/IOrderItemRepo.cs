using Stark_MunderDifflin.Models;

namespace Stark_MunderDifflin.Repos
{
    public interface IOrderItemRepo
    {
        public List<PaperOrderItem>? GetAllItemsByOrderId(int id);
        public void AddOrderItem(OrderItem item);
        public void DeleteOrderItem(int orderId, int paperId);
        public void UpdateOrderItemQuantity(int id, int quantity);
        public OrderItem? OrderItemExists(int paperId, int orderId);
    }
}
