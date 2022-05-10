using Microsoft.AspNetCore.Authorization;
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
        [Authorize]
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

        // PATCH: api/<PaperController>/Edit/5
        [HttpPut("Edit/{id}")]
        public IActionResult UpdatePaper(int id, [FromBody] Paper paperObj)
        {
            try
            {
                _paperRepo.UpdatePaper(id, paperObj);

                return Ok();
            }
            catch (Exception ex)
            {
                return NotFound();
            }
        }

        // DELETE api/<PaperController>/5
        [HttpDelete("Delete/{id}")]
        public void Delete(int id)
        {
            _paperRepo.DeletePaper(id); 
         
        }
    }
}


