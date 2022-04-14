using Stark_MunderDifflin.Models;

namespace Stark_MunderDifflin.Repos

{
    public interface IOrderRepo
    {
        List<Order> getAllOrders();
        List<Order> getAllOrdersByUID(string uid);
    }
}
