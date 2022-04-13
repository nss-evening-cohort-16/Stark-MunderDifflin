using Stark_MunderDifflin.Models;
using System.Data.SqlClient;

namespace Stark_MunderDifflin.Repos
{
    public class OrderItemRepo : IOrderItemRepo
    {
        private readonly IConfiguration _config;

        public OrderItemRepo(IConfiguration config)
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

        // Get
        public List<Paper>? GetAllItemsByOrderId(int orderId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id,p.Name, p.Color, p.Width, p.Length, p.Weight, p.Price
o.OrderId
                        FROM OrderItem as o
                        LEFT JOIN Paper as p
                        on p.Id = o.PaperId
                        WHERE o.OrderId = @id
                    ";

                    cmd.Parameters.AddWithValue("@orderId", orderId);

                    SqlDataReader reader = cmd.ExecuteReader();

                    List<Paper> list = new List<Paper>();

                    while (reader.Read())
                    {
                        Paper item = new Paper
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            Color = reader.GetString(reader.GetOrdinal("Color")),
                            Width = reader.GetInt32(reader.GetOrdinal("Width")),
                            Length = reader.GetInt32(reader.GetOrdinal("Length")),
                            Weight = reader.GetInt32(reader.GetOrdinal("Weight")),
                            Price = reader.GetDecimal(reader.GetOrdinal("Price"))                          
                        };

                        list.Add(item);
                    }
                    reader.Close();
                        return list;
                }
            }
        }
        public void AddOrderItem(OrderItem item)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO OrderItem (PaperId, OrderId)
                        OUTPUT INSERTED.ID
                        VALUES (@paperId, @orderId);
                    ";

                    cmd.Parameters.AddWithValue("@ownerId", item.PaperId);
                    cmd.Parameters.AddWithValue("@ownerId", item.OrderId);


                    int id = (int)cmd.ExecuteScalar();

                    item.Id = id;
                }
            }
        }

            public void DeleteOrderItem(int orderId, int paperId)
            {
                using (SqlConnection conn = Connection)
                {
                    using (SqlCommand cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"
                            DELETE
                            FROM OrderItem
                            WHERE OrderId = @oId AND  PaperId = @pId";

                        cmd.Parameters.AddWithValue("@oId", orderId);
                        cmd.Parameters.AddWithValue("@pId", paperId);

                        cmd.ExecuteNonQuery();
                    }
                }
            }
      
    }
}
