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
        public List<Order> getAllOrders()
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
    }
}
