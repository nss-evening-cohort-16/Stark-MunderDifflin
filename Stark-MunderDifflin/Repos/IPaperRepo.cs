using Stark_MunderDifflin.Models;

namespace Stark_MunderDifflin.Repos
{
    public interface IPaperRepo
    {
        List<Paper> getAll();
        Paper? getById(int id);
    }
}
