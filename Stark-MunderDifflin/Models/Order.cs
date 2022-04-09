namespace Stark_MunderDifflin.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int CustomerId { get; set; }
        public bool IsOpen { get; set; }
    }
}
