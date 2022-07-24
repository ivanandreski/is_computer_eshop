using Eshop.Domain.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Eshop.Domain.Relationships
{
    public class ProductInShoppingCart : BaseEntity
    {
        public int Quantity { get; set; }

        // Relatiionships

        [JsonIgnore]
        public long ProductId { get; set; }

        [Required]
        public Product? Product { get; set; }

        [JsonIgnore]
        public long ShoppingCartId { get; set; }
        [JsonIgnore]
        public ShoppingCart? ShoppingCart { get; set; }
    }
}
