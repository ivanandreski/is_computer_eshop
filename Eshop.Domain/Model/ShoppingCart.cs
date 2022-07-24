using Eshop.Domain.Identity;
using Eshop.Domain.Relationships;
using Eshop.Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Eshop.Domain.Model
{
    public class ShoppingCart : BaseEntity
    {
        public Money? TotalPrice { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime LastModified { get; set; }

        public bool Delivery { get; set; }

        // Relationships

        [JsonIgnore]
        public string? UserId { get; set; }
        [JsonIgnore]
        public EshopUser? User { get; set; }

        [JsonIgnore]
        public long? StoreId { get; set; }
        public Store? Store { get; set; }

        public virtual IEnumerable<ProductInShoppingCart>? Products { get; set; }
    }
}
