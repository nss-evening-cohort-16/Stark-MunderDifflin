﻿using Stark_MunderDifflin.Models;

namespace Stark_MunderDifflin.Repos
{
    public interface IPaperRepo
    {
        List<Paper> GetAll();
        Paper? GetById(int id);
        void AddPaper(Paper paper);
        void DeletePaper(int id);
        void UpdatePaper(int id, Paper paper);
    }
}
