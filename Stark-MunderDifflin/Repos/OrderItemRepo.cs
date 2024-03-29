﻿using Stark_MunderDifflin.Models;
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
        public List<PaperOrderItem>? GetAllItemsByOrderId(int orderId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT o.Id,p.Name, p.Color, p.Width, p.Length, p.Weight, p.Price, o.OrderId, o.Quantity, p.ImageURL
                        FROM OrderItem as o
                        LEFT JOIN Paper as p
                        on p.Id = o.PaperId
                        WHERE o.OrderId = @orderId";

                    cmd.Parameters.AddWithValue("@orderId", orderId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<PaperOrderItem> list = new List<PaperOrderItem>();
                        while (reader.Read())
                        {
                            PaperOrderItem item = new PaperOrderItem
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Name = reader.GetString(reader.GetOrdinal("Name")),
                                Color = reader.GetString(reader.GetOrdinal("Color")),
                                Width = reader.GetInt32(reader.GetOrdinal("Width")),
                                Length = reader.GetInt32(reader.GetOrdinal("Length")),
                                Weight = reader.GetInt32(reader.GetOrdinal("Weight")),
                                Price = reader.GetDecimal(reader.GetOrdinal("Price")),                         
                                Quantity = reader.GetInt32(reader.GetOrdinal("Quantity")),
                                ImageURL = reader.GetString(reader.GetOrdinal("ImageURL"))
                            };

                        list.Add(item);
                        }
                        return list;
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
                        INSERT INTO OrderItem (PaperId, OrderId, Quantity)
                        VALUES (@paperId, @orderId, @quantity);
                    ";

                    cmd.Parameters.AddWithValue("@paperId", item.PaperId);
                    cmd.Parameters.AddWithValue("@orderId", item.OrderId);
                    cmd.Parameters.AddWithValue("@quantity", item.Quantity);


                    int id = (int)cmd.ExecuteNonQuery();

                    item.Id = id;
                }
            }
        }

        public void DeleteOrderItem(int orderItemId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE
                        FROM OrderItem
                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", orderItemId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void UpdateOrderItemQuantity(int id, int quantity)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE OrderItem
                        SET Quantity = @quantity
                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@quantity", quantity);
                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public OrderItem? OrderItemExists(int paperId, int orderId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd =conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, PaperId, OrderId, Quantity
                        FROM OrderItem
                        WHERE PaperId = @paperId AND OrderId = @orderId";

                    cmd.Parameters.AddWithValue("@paperId", paperId);
                    cmd.Parameters.AddWithValue("@orderId", orderId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if(reader.Read())
                        {
                            OrderItem item = new OrderItem()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                OrderId = reader.GetInt32(reader.GetOrdinal("OrderId")),
                                PaperId = reader.GetInt32(reader.GetOrdinal("PaperId")),
                                Quantity = reader.GetInt32(reader.GetOrdinal("Quantity"))
                            };
                            return item;
                        }
                        else return null;
                    }
                }
            }
        }

    }
}
