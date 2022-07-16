using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Domain.Model
{
    public class Category : BaseEntity
    {
        public string Name { get; set; }

        // Relationships

        public virtual IEnumerable<Product> Products { get; set; }
    }
}
