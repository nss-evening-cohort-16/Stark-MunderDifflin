using Stark_MunderDifflin.Models;

namespace Stark_MunderDifflin.Repos

{
    public interface IOrderRepo
    {
        public List<Order> getAllOrders();
        public void DeleteOrder(int orderId);
        public List<Order> getAllOrdersByUID(string uid);
        public void AddOrder(Order order);
    }
}
