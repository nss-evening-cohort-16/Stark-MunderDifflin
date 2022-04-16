using Stark_MunderDifflin.Models;

namespace Stark_MunderDifflin.Repos
{
    public interface ICustomerRepository
    {
        Customer GetCustomerByEmail(string email);
        Customer GetCustomerByUID(string uid);
    }
}
