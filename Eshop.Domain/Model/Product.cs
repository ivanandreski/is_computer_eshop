using Eshop.Domain.Relationships;
using Eshop.Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Domain.Model
{
    public class Product : BaseEntity
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public Money Price { get; set; }

        public byte[] Image { get; set; }

        public bool Discontinued { get; set; }

        // Relationships

        public long CategoryId { get; set; }
        public Category Category { get; set; }

        public virtual IEnumerable<ProductInShoppingCart> ProductsInShoppingCart { get; set; }

        public virtual IEnumerable<ProductInStore> ProductsInStore { get; set; }

        public virtual IEnumerable<ProductInOrder> ProductsInOrder { get; set; }
    }
}
