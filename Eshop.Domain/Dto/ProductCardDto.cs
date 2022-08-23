using Eshop.Domain.Relationships;
using Eshop.Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Domain.Dto
{
    public class ProductCardDto
    {
        public string? Name { get; set; }

        public Money? Price { get; set; }

        public string? Manufacturer { get; set; }

        public byte[] Image { get; set; } = new byte[0];

        public bool IsAvailable { get; set; }
    }
}
