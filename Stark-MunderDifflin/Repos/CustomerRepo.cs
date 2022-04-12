using Stark_MunderDifflin.Models;
using System.Data.SqlClient;

namespace Stark_MunderDifflin.Repos
{
    public class CustomerRepo : ICustomerRepository
    {
        private readonly IConfiguration _config;

        public CustomerRepo(IConfiguration config)
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
        public Customer getCustomerByEmail(string email)
        {
            throw new NotImplementedException();
        }

        public Customer getCustomerByUID(string uid)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT * FROM Customer
                                        WHERE UID = @uid 
                                        ";
                    cmd.Parameters.AddWithValue("@uid", uid);

                    SqlDataReader reader = cmd.ExecuteReader(); 

                    if (reader.Read())
                    {
                        Customer customer = new Customer
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            Email = reader.GetString(reader.GetOrdinal("Email")),
                            UID = reader.GetString(reader.GetOrdinal("UID")),
                        };
                    return customer;
                    }
                    else
                    {
                        reader.Close();
                        return null;
                    }
                }
            }
        }
    }
}
