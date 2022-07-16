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
    public class Store : BaseEntity
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public Address Address { get; set; }

        // Relationships

        public virtual IEnumerable<ProductInStore> Products { get; set; }

        public virtual IEnumerable<Order> Orders { get; set; }
    }
}
