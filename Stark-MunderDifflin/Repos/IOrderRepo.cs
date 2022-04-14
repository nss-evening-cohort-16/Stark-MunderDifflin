using Stark_MunderDifflin.Models;

namespace Stark_MunderDifflin.Repos

{
    public interface IOrderRepo
    {
        List<Order> getAllOrders();
        void DeleteOrder(int orderId);
        List<Order> getAllOrdersByUID(string uid);
    }
}
