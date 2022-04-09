using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Stark_MunderDifflin.Controllers
{
    public class PaperController : Controller
    {
        // GET: PaperControlller
        public ActionResult Index()
        {
            return View();
        }

        // GET: PaperControlller/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: PaperControlller/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: PaperControlller/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: PaperControlller/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: PaperControlller/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: PaperControlller/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: PaperControlller/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
