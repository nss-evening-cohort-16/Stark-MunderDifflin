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
        public OrderItem GetById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, OrderId, PaperId 
                        FROM OrderItem
                        WHERE Id = @id
                    ";

                    cmd.Parameters.AddWithValue("@id", id);

                    SqlDataReader reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        OrderItem item = new OrderItem
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            OrderId = reader.GetInt32(reader.GetOrdinal("OrderId")),
                            PaperId = reader.GetInt32(reader.GetOrdinal("PaperId")),
                        };

                        reader.Close();

                        return item;
                    }
                    else
                    {
                        reader.Close();

                        return null;
                    }
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
