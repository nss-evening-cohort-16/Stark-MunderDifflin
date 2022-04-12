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
