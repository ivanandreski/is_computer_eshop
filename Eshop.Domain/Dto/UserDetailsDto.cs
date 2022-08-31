using Eshop.Domain.Identity;
using Eshop.Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Domain.Dto
{
    public class UserDetailsDto
    {
        public string Email { get; set; } = "";

        public string Username { get; set; } = "";

        public string FirstName { get; set; } = "";

        public string LastName { get; set; } = "";

        public Address Addrress { get; set; } = new Address("", "", "", "");

        public string Phone { get; set; } = "";

        public UserDetailsDto(EshopUser user)
        {
            Email = user.Email;
            Username = user.UserName;
            FirstName = user.FirstName ?? "/";
            LastName = user.LastName ?? "/";
            Addrress = user.Address ?? new Address("", "", "", "");
            Phone = user.PhoneNumber ?? "/";
        }

        public UserDetailsDto()
        {
        }
    }
}
