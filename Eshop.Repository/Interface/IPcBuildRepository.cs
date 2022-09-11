using Eshop.Domain.Identity;
using Eshop.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Repository.Interface
{
    public interface IPcBuildRepository
    {
        Task<PCBuild?> GetUserPcBuild(EshopUser user);

        Task<PCBuild?> Get(long id);

        Task<PCBuild> Create(PCBuild post);

        Task<PCBuild> Update(PCBuild post);

        Task<PCBuild> Remove(PCBuild post);
    }
}
