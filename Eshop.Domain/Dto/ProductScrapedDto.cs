using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Domain.Dto
{
    public class ProductScrapedDto
    {
        [Required]
        public string? Name { get; set; }

        [Required]
        public string? Category { get; set; }

        [Required]
        public int? Price { get; set; }

        [Required]
        public string? Url { get; set; }

        [Required]
        public int? RealId { get; set; }

        [Required]
        public IEnumerable<string> ImageBase64 { get; set; } = Enumerable.Empty<string>();

        [Required]
        public string? Manufacturer { get; set; }

        [Required]
        public string? Description { get; set; }
    }
}
