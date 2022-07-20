using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Repository.PremadeRepos
{
    public class RolesRepository
    {
        private readonly Dictionary<string, int> roles = new Dictionary<string, int>()
        {
            { "User", 1 },
            { "StoreWorker", 2},
            { "Moderator", 3 },
            { "Admin", 4 }
        };

        public List<string> GetRoles()
        {
            return roles.Keys.ToList();
        }

        public int GetLevelOfRole(string roleName)
        {
            return roles.GetValueOrDefault(roleName);
        }

        public bool RoleHasAccess(string hasRole, string roleNeeded)
        {
            return roles.GetValueOrDefault(hasRole) >= roles.GetValueOrDefault(roleNeeded);
        }
    }
}
