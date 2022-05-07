using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Authorization;
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

        // GET api/<CustomerController>/Email/5
        [HttpGet("Email/{email}")]
        public IActionResult GetCustomerByEmail(string email)
        {
            Customer customer = _customerRepo.GetCustomerByEmail(email);

            if (customer == null)
            {
                return NotFound();
            }
            return Ok(customer);
        }

        // GET api/<CustomerController>/5
        [HttpGet("UID/{uid}")]
        public IActionResult GetCustomerByUID(string uid)
        {
            Customer customer = _customerRepo.GetCustomerByUID(uid);

            if (customer == null)
            {
                return NotFound();
            }
            return Ok(customer);
        }

        // GET api/Auth/<CustomerController>
        [Authorize]
        [HttpGet("Auth")]
        public async Task<IActionResult> PostAsync([FromHeader] string idToken)
        {
            FirebaseToken decoded = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(idToken);
            //var token = User.FindFirst(Claim => Claim.Type == "user_id");
            var uid = decoded.Uid;
            bool customerExists = _customerRepo.CustomerExists(uid);
            if (!customerExists)
            {
                Customer userFromToken = new Customer()
                {
                    Name = (string)decoded.Claims.GetValueOrDefault("name"),
                    Email = (string)decoded.Claims.GetValueOrDefault("email"),
                    UID = uid,
                };

                int customerId = _customerRepo.CreateCustomer(userFromToken);
                return Ok($"Customer Created ID={customerId}");

            }
            return Ok("Customer Exists");

        }

        //// PUT api/<CustomerController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE api/<CustomerController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
