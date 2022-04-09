using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Stark_MunderDifflin.Controllers
{
    public class PaperController : Controller
    {
        // GET: PaperController
        public ActionResult Index()
        {
            return View();
        }

        // GET: PaperController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: PaperController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: PaperController/Create
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

        // GET: PaperController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: PaperController/Edit/5
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

        // GET: PaperController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: PaperController/Delete/5
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
