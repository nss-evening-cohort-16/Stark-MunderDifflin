using Stark_MunderDifflin.Models;

namespace Stark_MunderDifflin.Repos
{
    public interface IOrderItemRepo
    {
        List<PaperOrderItem>? GetAllItemsByOrderId(int id);
        void AddOrderItem(OrderItem item);
        public void DeleteOrderItem(int orderId, int paperId);
        public void UpdateOrderItemQuantity(int id, int quantity);
    }
}
