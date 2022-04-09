using Microsoft.AspNetCore.Mvc;
using Stark_MunderDifflin.Models;
using Stark_MunderDifflin.Repos;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Stark_MunderDifflin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaperController : Controller
    {
        private readonly IPaperRepo _paperRepo;

        public PaperController(IPaperRepo paperRepo)
        {
            _paperRepo = paperRepo;
        }

        // GET: api/<PaperController>
        [HttpGet]
        public IActionResult Get()
        {
            List<Paper> papers = _paperRepo.getAll();
            if (papers == null) return NotFound();
            return Ok(papers);
        }

        // GET api/<PaperController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<PaperController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<PaperController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<PaperController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
