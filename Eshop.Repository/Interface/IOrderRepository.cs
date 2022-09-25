using Eshop.Domain.Dto.Filters;
using Eshop.Domain.Identity;
using Eshop.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Repository.Interface
{
    public interface IOrderRepository
    {
        Task<List<Order>> GetOrdersForUser(EshopUser user);

        Task<IEnumerable<Order>> GetOrdersExport(ExportOrdersFilter filter);

        Task<Order> Create(Order order);

        Task<Order> Update(Order order);

        Task<Order?> Get(long orderId);

        Task<IEnumerable<Order>> GetOrdersManager(string role, string searchParams);
    }
}
