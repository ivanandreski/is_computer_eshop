using Eshop.Domain.Dto;
using Eshop.Domain.Identity;
using Eshop.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Service.Interface
{
    public interface IPcBuildService
    {
        Task<PCBuild?> GetUserPcBuild(EshopUser user);

        Task<PCBuild?> ChangeProduct(EshopUser user, long productId, UpdateProductInPcBuildDto dto);
    }
}
