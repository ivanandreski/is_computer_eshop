using Eshop.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Eshop.Domain.Relationships
{
    public class ProductImages : BaseEntity
    {
        public byte[]? Image { get; set; }

        [JsonIgnore]
        public long? ProductId { get; set; }
        [JsonIgnore]
        public Product? Product { get; set; }
    }
}
