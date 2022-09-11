using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Domain.Dto
{
    public class UpdateProductInPcBuildDto
    {
        // string productType, long productId, int count
        [Required]
        public string ProductType { get; set; } = "";

        [Required]
        public string ProductHashId { get; set; } = "";

        [Required]
        public int Count { get; set; }
    }
}
