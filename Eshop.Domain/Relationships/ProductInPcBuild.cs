using Eshop.Domain.Model;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Eshop.Domain.Relationships
{
    public class ProductInPcBuild : BaseEntity
    {
        public string? Key { get; set; }

        [JsonIgnore]
        public long ProductId { get; set; }
        public Product? Product { get; set; }
        public int Count { get; set; } = 0;
        [NotMapped]
        public double Price
        {
            get
            {
                return Count * (Product?.Price?.Amount ?? 0.0);
            }
        }

        [JsonIgnore]
        public long PcBuildId { get; set; }
        [JsonIgnore]
        public PCBuild? PcBuild { get; set; }
    }
}
