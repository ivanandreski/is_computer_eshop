using Eshop.Domain.Identity;
using Eshop.Domain.Relationships;
using Eshop.Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Domain.Model
{
    public class ShoppingCart : BaseEntity
    {
        public Money TotalPrice { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime LastModified { get; set; }

        public bool Delivery { get; set; }

        // Relationships

        public long UserId { get; set; }
        public EshopUser User { get; set; }

        public long StoreId { get; set; }
        public Store Store { get; set; }

        public virtual IEnumerable<ProductInShoppingCart> Products { get; set; }
    }
}
