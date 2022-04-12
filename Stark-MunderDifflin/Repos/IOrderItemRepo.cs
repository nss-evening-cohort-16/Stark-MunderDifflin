using Stark_MunderDifflin.Models;

namespace Stark_MunderDifflin.Repos
{
    public interface IOrderItemRepo
    {
        OrderItem GetById(int id);
        void AddOrderItem(OrderItem item);
    }
}
