using Stark_MunderDifflin.Models;
using System.Data.SqlClient;

namespace Stark_MunderDifflin.Repos
{
    public class OrderRepo : IOrderRepo
    {
        private readonly IConfiguration _config;

        public OrderRepo(IConfiguration config)
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
        public List<Order> GetAllOrders()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, 
                               CustomerId, 
                               IsOpen
                        FROM [Order]";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Order> orders = new List<Order>();
                        while (reader.Read())
                        {
                            Order order = new Order()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                CustomerId = reader.GetString(reader.GetOrdinal("CustomerId")),
                                IsOpen = reader.GetBoolean(reader.GetOrdinal("IsOpen")),
                            };
                            orders.Add(order);
                        }
                        return orders;
                    }
                }

            }
        }
        public void DeleteOrder(int orderId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            DELETE FROM Order
                            WHERE Id = @id
                        ";

                    cmd.Parameters.AddWithValue("@id", orderId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<Order> GetAllOrdersByUID(string uid)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        Select *
                                        FROM [Order]
                                        Where CustomerId = @uid
                                      ";
                    cmd.Parameters.AddWithValue("@uid", uid);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Order> customerOrders = new List<Order>();
                        while (reader.Read())
                        {
                            Order customerOrder = new Order()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                CustomerId = reader.GetString(reader.GetOrdinal("CustomerId")),
                                IsOpen = reader.GetBoolean(reader.GetOrdinal("IsOpen")),
                            };
                            customerOrders.Add(customerOrder);
                        }
                        return customerOrders;
                    }
                }
            }
        }

        public void AddOrder(Order order)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        INSERT INTO [Order]
                                        (CustomerId, IsOpen)
                                        OUTPUT INSERTED.ID
                                        VALUES (@customerId, @isOpen)
                                        ";
                    cmd.Parameters.AddWithValue("@customerId", order.CustomerId);
                    cmd.Parameters.AddWithValue("@isOpen", true);

                    int id = (int)cmd.ExecuteScalar();

                    order.Id = id;
                }
            }
        }

        public void CloseOrder(int orderId)
        {
            using(SqlConnection conn = Connection)
            {
                conn.Open();

                using(SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE [Order]
                        SET isOpen = 0
                        WHERE Id = @orderId";

                    cmd.Parameters.AddWithValue("@orderId", orderId);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
