using Stark_MunderDifflin.Models;

namespace Stark_MunderDifflin.Repos
{
    public interface ICustomerRepository
    {
        Customer getCustomerByEmail(string email);
        Customer getCustomerByUID(string uid);
    }
}
