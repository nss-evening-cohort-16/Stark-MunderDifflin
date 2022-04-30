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

                                ImageURL = reader.GetString(reader.GetOrdinal("ImageURL"))
                            };
                            papers.Add(paper);
                        }
                        return papers;
                    }
                }
            }
        }
        public void AddPaper(Paper paper)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Paper ([Name], Color, Length, Width, Weight, Price, ImageURL)
                        OUTPUT INSERTED.ID
                        VALUES (@name, @color, @length, @width, @weight, @price, @imageURL);
                    ";

                    cmd.Parameters.AddWithValue("@name", paper.Name);
                    cmd.Parameters.AddWithValue("@color", paper.Color);
                    cmd.Parameters.AddWithValue("@length", paper.Length);
                    cmd.Parameters.AddWithValue("@width", paper.Width);
                    cmd.Parameters.AddWithValue("@weight", paper.Weight);
                    cmd.Parameters.AddWithValue("@price", paper.Price);
                    cmd.Parameters.AddWithValue("ImageURL", paper.ImageURL);
                   
                    int id = (int)cmd.ExecuteScalar();

                    paper.Id = id;
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
                                ImageURL = reader.GetString(reader.GetOrdinal("ImageURL"))
                            };
                            return paper;
                        }
                        else return null;
                    }
                }
            }
        }

        public void UpdatePaper(int id, Paper paper)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Paper
                                        SET [Name] = @name,
	                                        Color = @color,
	                                        [Length] = @length,
	                                        Width = @width,
	                                        [Weight] = @weight,
	                                        Price = @price,
	                                        ImageURL = @imageURL
		                                        WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.Parameters.AddWithValue("@name", paper.Name);
                    cmd.Parameters.AddWithValue("@color", paper.Color);
                    cmd.Parameters.AddWithValue("@length", paper.Length);
                    cmd.Parameters.AddWithValue("@width", paper.Width);
                    cmd.Parameters.AddWithValue("@weight", paper.Weight);
                    cmd.Parameters.AddWithValue("@price", paper.Price);
                    cmd.Parameters.AddWithValue("@imageURL", paper.ImageURL);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
