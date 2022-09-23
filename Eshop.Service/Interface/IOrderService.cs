using Eshop.Domain.Dto;
using Eshop.Domain.Dto.Filters;
using Eshop.Domain.Identity;
using Eshop.Domain.Model;
using Eshop.Domain.Relationships;
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

        Task<IEnumerable<OrderDto>> GetOrdersAdmin(ExportOrdersFilter filter);

        Task<Order?> MakeOrder(EshopUser user, long? storeRawId);

        Task<Order?> Get(EshopUser user, long orderId); 
    }
}
