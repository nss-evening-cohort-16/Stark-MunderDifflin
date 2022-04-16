using Stark_MunderDifflin.Models;

namespace Stark_MunderDifflin.Repos
{
    public interface IPaperRepo
    {
        List<Paper> GetAll();
        Paper? GetById(int id);
    }
}
