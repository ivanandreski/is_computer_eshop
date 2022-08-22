using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Domain.Projections
{
    public class EshopUserProjection
    {
        public string? Username { get; set; }

        public string? Email { get; set; }

        public List<string> Roles { get; set; } = new List<string>();

        public EshopUserProjection(string? username, string? email, List<string> roles)
        {
            Username = username;
            Email = email;
            Roles = roles;
        }
    }
}
