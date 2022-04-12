using Microsoft.AspNetCore.Mvc;
using Stark_MunderDifflin.Models;
using Stark_MunderDifflin.Repos;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Stark_MunderDifflin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerRepository _customerRepo;

        public CustomerController(ICustomerRepository customerRepository)
        {
            _customerRepo = customerRepository;
        }

        // GET: api/<CustomerController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<CustomerController>/5
        [HttpGet("{uid}")]
        public IActionResult GetCustomerByUID(string uid)
        {
            Customer customer = _customerRepo.getCustomerByUID(uid);

            if (customer == null)
            {
                return NotFound();
            }
            return Ok(customer);
        }

        // POST api/<CustomerController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<CustomerController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<CustomerController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
