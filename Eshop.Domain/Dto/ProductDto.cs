using Eshop.Domain.Model;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Domain.Dto
{
    public class ProductDto
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public double BasePrice { get; set; }

        public string CategoryIdHash { get; set; }

        public string Manufacturer { get; set; }

        public IFormFile Image { get; set; }

        public bool Discontinued { get; set; }
    }
}
