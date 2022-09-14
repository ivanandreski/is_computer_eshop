using Eshop.Domain.Identity;
using Eshop.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Service.Interface
{
    public interface IShoppingCartService
    {
        Task<ShoppingCart> Create(EshopUser user);

        Task<ShoppingCart> Get(EshopUser user);

        Task<ShoppingCart> Clear(EshopUser user);

        Task<ShoppingCart> AddProduct(EshopUser user, long productId);

        Task<ShoppingCart?> ChangeQuantity(EshopUser user, long productInCartId, int quantity);

        Task<ShoppingCart?> RemoveProduct(EshopUser user, long productInCartId);

        Task<ShoppingCart?> Edit(EshopUser user, long storeId, bool delivery);

        Task<ShoppingCart> OrderPc(EshopUser user, PCBuild pcBuild);
    }
}
