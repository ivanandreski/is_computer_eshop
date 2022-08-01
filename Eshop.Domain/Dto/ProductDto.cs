using Eshop.Domain.Model;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Domain.Dto
{
    public class ProductDto
    {
        [Required]
        public string? Name { get; set; }

        public string? Description { get; set; }

        [Required]
        public double? BasePrice { get; set; }

        public string? CategoryIdHash { get; set; }

        [Required]
        public string? Manufacturer { get; set; }

        public List<IFormFile> Image { get; set; } = new List<IFormFile>();

        //public string ImageJson { get; set; } = "";

        [Required]
        public bool Discontinued { get; set; }
    }
}
