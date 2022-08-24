using Eshop.Domain.Relationships;
using Eshop.Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Eshop.Domain.Model
{
    public class Product : BaseEntity
    {
        public string? Name { get; set; }

        public string? Description { get; set; }

        public Money? Price { get; set; }

        public string? Manufacturer { get; set; }

        public bool Discontinued { get; set; }

        // Relationships

        [JsonIgnore]
        public long CategoryId { get; set; }

        public Category? Category { get; set; }

        [JsonIgnore]
        public virtual ICollection<Tag> Tags { get; set; } = new Collection<Tag>();

        [JsonIgnore]
        public virtual IEnumerable<ProductInShoppingCart>? ProductsInShoppingCart { get; set; }

        [JsonIgnore]
        public virtual ICollection<ProductInStore> ProductsInStore { get; set; } = new Collection<ProductInStore>();

        [JsonIgnore]
        public virtual IEnumerable<ProductInOrder>? ProductsInOrder { get; set; }

        public virtual IList<ProductImages> Images { get; set; } = new List<ProductImages>();
    }
}
