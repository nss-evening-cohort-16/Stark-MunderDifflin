using Stark_MunderDifflin.Models;

namespace Stark_MunderDifflin.Repos
{
    public interface IOrderItemRepo
    {
        public void DeleteOrderItem(int orderId, int paperId);
    }
}
