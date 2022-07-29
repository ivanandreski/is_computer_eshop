using Eshop.Domain.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Eshop.Domain.Relationships
{
    public class ProductInStore : BaseEntity
    {
        public int Quantity { get; set; }

        // Relatiionships

        [JsonIgnore]
        public long ProductId { get; set; }
        [JsonIgnore]
        public Product? Product { get; set; }

        [JsonIgnore]
        public long StoreId { get; set; }
        public Store? Store { get; set; }

        [NotMapped]
        public bool Available { get { return Quantity > 0; } }
    }
}
