using Eshop.Domain.Dto;
using Eshop.Domain.Identity;
using Eshop.Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Service.Interface
{
    public interface IOrderService
    {
        Task<List<OrderDto>> GetOrdersForUser(EshopUser user);
    }
}
