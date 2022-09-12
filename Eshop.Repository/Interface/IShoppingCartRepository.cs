using Eshop.Domain.Identity;
using Eshop.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Repository.Interface
{
    public interface IShoppingCartRepository
    {
        Task<ShoppingCart?> Get(EshopUser user);

        Task<ShoppingCart> Create(ShoppingCart cart);

        Task<ShoppingCart> Update(ShoppingCart cart);

        Task<ShoppingCart> Remove(ShoppingCart cart);
    }
}
