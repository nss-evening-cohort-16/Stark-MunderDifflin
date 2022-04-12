using Stark_MunderDifflin.Models;
using System.Data.SqlClient;

namespace Stark_MunderDifflin.Repos
{
    public class PaperRepo : IPaperRepo
    {
        private readonly IConfiguration _config;

        public PaperRepo(IConfiguration config)
        {
            _config = config;
        }

        public SqlConnection Connection
        {
            get
            {
                return new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            }
        }
        public List<Paper> getAll()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT [Name], Color, [Length], Width, [Weight], Price
                        FROM Paper";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Paper> papers = new List<Paper>();
                        while (reader.Read())
                        {
                            Paper paper = new Paper()
                            {
                                Name = reader.GetString(reader.GetOrdinal("Name")),
                                Color = reader.GetString(reader.GetOrdinal("Color")),
                                Length = reader.GetInt32(reader.GetOrdinal("Length")),
                                Width = reader.GetInt32(reader.GetOrdinal("Width")),
                                Weight = reader.GetInt32(reader.GetOrdinal("Weight")),
                                Price = reader.GetDecimal(reader.GetOrdinal("Price")),
                            };
                            papers.Add(paper);
                        }
                        return papers;
                    }
                }
            }
        }

        public Paper getById(int id)
        {
           return new Paper();
        }
    }
}
