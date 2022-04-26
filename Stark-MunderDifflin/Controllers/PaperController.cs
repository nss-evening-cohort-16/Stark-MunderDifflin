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
            List<Paper> papers = _paperRepo.GetAll();
            if (papers == null) return NotFound();
            return Ok(papers);
        }

        // GET api/<PaperController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var paper = _paperRepo.GetById(id);
            if (paper == null) return NotFound();
            return Ok(paper);
        }

        // POST api/<PaperController>
      
        [HttpPost]
        public IActionResult PostOrder([FromBody] Paper newPaper)
        {
            if (newPaper == null)
            {
                return NotFound();
            }
            else
            {
                _paperRepo.AddPaper(newPaper);
                return Ok(newPaper);
            }

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
