using Stark_MunderDifflin.Models;

namespace Stark_MunderDifflin.Repos
{
    public interface IOrderItemRepo
    {
        List<Paper>? GetAllItemsByOrderId(int id);
        void AddOrderItem(OrderItem item);
        public void DeleteOrderItem(int orderId, int paperId);
    }
}
