using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Domain.Dto
{
    public class SetRolesDto
    {
        [Required]
        public string? Username { get; set; }

        [Required]
        public List<string> Roles { get; set; } = new List<string>();
    }
}
