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
    }
}
