using Eshop.Domain.Images;
using Eshop.Domain.Model;
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
        public string? HashId { get; set; }

        public string? Name { get; set; }

        public Money? Price { get; set; }

        public string? Manufacturer { get; set; }

        public byte[] Image { get; set; } = new byte[0];

        public bool IsAvailable { get; set; }

        public ProductCardDto(Product product)
        {
            HashId = product.HashId;
            Name = product.Name;
            Price = product.Price;
            Manufacturer = product.Manufacturer;
            IsAvailable = product.ProductsInStore.Where(product => !product.Available).Count() < 1;
            Image = product.Images[0]?.Image ?? Convert.FromBase64String(DefaultImage.base64);
        }


    }
}
