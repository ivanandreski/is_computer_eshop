using Eshop.Domain.Model;
using Eshop.Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Domain.Dto
{
    public class ProductPcBuildDto
    {
        public string HashId { get; set; } = "";
        public string Name { get; set; } = "";
        public Money Price { get; set; } = new Money(0);
        public string Type { get; set; } = "";

        public ProductPcBuildDto()
        {
        }

        public ProductPcBuildDto(Product product)
        {
            HashId = product.HashId;
            Name = product.Name;
            Price = product.Price;
            Type = product.Category.Name;
        }
    }
}
