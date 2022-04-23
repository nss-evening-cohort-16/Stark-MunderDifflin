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
        public List<Paper> GetAll()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, [Name], Color, [Length], Width, [Weight], Price, ImageURL
                        FROM Paper";
                    //, ImageURL
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Paper> papers = new List<Paper>();
                        while (reader.Read())
                        {
                            Paper paper = new Paper()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Name = reader.GetString(reader.GetOrdinal("Name")),
                                Color = reader.GetString(reader.GetOrdinal("Color")),
                                Length = reader.GetInt32(reader.GetOrdinal("Length")),
                                Width = reader.GetInt32(reader.GetOrdinal("Width")),
                                Weight = reader.GetInt32(reader.GetOrdinal("Weight")),
                                Price = reader.GetDecimal(reader.GetOrdinal("Price")),
<<<<<<< HEAD
                                //ImageURL = reader.GetString(reader.GetOrdinal("ImageUrl"))
=======
                                ImageURL = reader.GetString(reader.GetOrdinal("ImageURL"))
>>>>>>> main
                            };
                            papers.Add(paper);
                        }
                        return papers;
                    }
                }
            }
        }
        public Paper? GetById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, [Name], Color, [Length], Width, [Weight], Price, ImageURL
                        FROM Paper
                        WHERE Id = @id";
                    //, ImageURL
                    cmd.Parameters.AddWithValue("@id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            Paper paper = new Paper()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Name = reader.GetString(reader.GetOrdinal("Name")),
                                Color = reader.GetString(reader.GetOrdinal("Color")),
                                Length = reader.GetInt32(reader.GetOrdinal("Length")),
                                Width = reader.GetInt32(reader.GetOrdinal("Width")),
                                Weight = reader.GetInt32(reader.GetOrdinal("Weight")),
                                Price = reader.GetDecimal(reader.GetOrdinal("Price")),
<<<<<<< HEAD
                                //ImageURL = reader.GetString(reader.GetOrdinal("ImageUrl"))
=======
                                ImageURL = reader.GetString(reader.GetOrdinal("ImageURL"))
>>>>>>> main
                            };
                            return paper;
                        }
                        else return null;
                    }
                }
            }
        }
    }
}
