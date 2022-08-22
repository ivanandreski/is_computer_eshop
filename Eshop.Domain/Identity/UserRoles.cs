using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Domain.Identity
{
    public static class UserRoles
    {
        public const string Admin = "Admin";
        public const string Manager = "Manager";
        public const string StoreClerk = "StoreClerk";
        public const string User = "User";

        public static List<string> GetRoles()
        {
            return new List<string> { Admin, Manager, StoreClerk, User };
        }

    }
}
