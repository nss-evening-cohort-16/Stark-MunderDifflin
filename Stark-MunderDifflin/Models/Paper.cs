﻿namespace Stark_MunderDifflin.Models
{
    public class Paper
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Color { get; set; }
        public int Width { get; set; }
        public int Length { get; set; }
        public int Weight {get; set; }
        public decimal Price { get; set; }
        public string? ImageURL { get; set; }
    }
}
