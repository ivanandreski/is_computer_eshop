using Eshop.Domain.Identity;
using Eshop.Domain.Model;
using Eshop.Domain.Relationships;
using Eshop.Domain.ValueObjects;
using Eshop.Repository.Interface;
using Eshop.Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Service.Implementation
{
    public class ShoppingCartService : IShoppingCartService
    {
        private readonly IRepository<ShoppingCart> _shoppingCartRepository;
        private readonly IRepository<ProductInShoppingCart> _productInShoppingCartRepository;
        private readonly IRepository<Store> _storeRepository;
        private readonly IRepository<Product> _productRepository;

        public ShoppingCartService(IRepository<ShoppingCart> shoppingCartRepository, IRepository<ProductInShoppingCart> productInShoppingCartRepository, IRepository<Store> storeRepository, IRepository<Product> productRepository)
        {
            _shoppingCartRepository = shoppingCartRepository;
            _productInShoppingCartRepository = productInShoppingCartRepository;
            _storeRepository = storeRepository;
            _productRepository = productRepository;
        }

        public async Task<ShoppingCart> AddProduct(EshopUser user, long productId)
        {
            var cart = await Get(user);
            var product = await _productRepository.Get(productId);
            ProductInShoppingCart pshp;

            if (productExists(productId, cart.Products))
            {
                pshp = (await _productInShoppingCartRepository.GetAll())
                    .First(p => p.ProductId == productId 
                            && p.ShoppingCartId == cart.Id);

                pshp.Quantity += 1;

                cart = await Get(user);
                cart.TotalPrice.BasePrice = CalculateTotalPrice(cart.Products);
                cart.LastModified = DateTime.Now;

                return await _shoppingCartRepository.Update(cart);
            }

            pshp = new ProductInShoppingCart();
            pshp.ShoppingCart = cart;
            pshp.ShoppingCartId = cart.Id;
            pshp.Product = product;
            pshp.ProductId = product.Id;
            pshp.Quantity = 1;
            await _productInShoppingCartRepository.Create(pshp);

            cart = await Get(user);
            cart.TotalPrice.BasePrice = CalculateTotalPrice(cart.Products);
            cart.LastModified = DateTime.Now;

            return await _shoppingCartRepository.Update(cart);
        }

        public async Task<ShoppingCart?> ChangeQuantity(EshopUser user, long productInCartId, int quantity)
        {
            var pshp = await _productInShoppingCartRepository.Get(productInCartId);
            if (pshp.ShoppingCart.UserId != user.Id)
                return null;

            if(quantity < 1)
            {
                pshp.Quantity = 1;
            }
            else
            {
                pshp.Quantity = quantity;
            }

            var cart = await Get(user);
            cart.TotalPrice.BasePrice = CalculateTotalPrice(cart.Products);
            cart.LastModified = DateTime.Now;

            return await _shoppingCartRepository.Update(cart);
        }

        public async Task<ShoppingCart?> RemoveProduct(EshopUser user, long productInCartId)
        {
            var pshp = await _productInShoppingCartRepository.Get(productInCartId);
            if (pshp.ShoppingCart.UserId != user.Id)
                return null;

            await _productInShoppingCartRepository.Remove(pshp);

            var cart = await Get(user);
            cart.TotalPrice.BasePrice = CalculateTotalPrice(cart.Products);
            cart.LastModified = DateTime.Now;

            return await _shoppingCartRepository.Update(cart);
        }

        public async Task<ShoppingCart> Clear(EshopUser user)
        {
            var cart = await Get(user);

            cart.TotalPrice = new Money();
            cart.TotalPrice.BasePrice = 0;
            cart.Products = Enumerable.Empty<ProductInShoppingCart>();

            cart.Store = null;
            cart.StoreId = null;
            cart.Delivery = false;
            cart.LastModified = DateTime.Now;

            return await _shoppingCartRepository.Update(cart);
        }

        public async Task<ShoppingCart> Create(EshopUser user)
        {
            var cart = new ShoppingCart();
            cart.User = user;
            cart.UserId = user.Id;
            cart.Store = null;
            cart.StoreId = null;
            cart.LastModified = DateTime.Now;
            cart.TotalPrice = new Money();
            cart.TotalPrice.BasePrice = 0;

            return await _shoppingCartRepository.Create(cart);
        }

        public async Task<ShoppingCart?> Edit(EshopUser user, long storeId, bool delivery)
        {
            var cart = await Get(user);

            var store = await _storeRepository.Get(storeId);
            if (store == null)
                return null;

            cart.Delivery = delivery;
            cart.Store = store;
            cart.StoreId = store.Id;
            cart.LastModified = DateTime.Now;

            return await _shoppingCartRepository.Update(cart);
        }

        public async Task<ShoppingCart> Get(EshopUser user)
        {
            var exists = (await _shoppingCartRepository.GetAll())
                .Any(x => x.UserId.Equals(user.Id));

            if (!exists)
                await Create(user);

            return (await _shoppingCartRepository.GetAll())
                .First(x => x.UserId.Equals(user.Id));
        }

        // Helper methods

        private double CalculateTotalPrice(IEnumerable<ProductInShoppingCart> products)
        {
            return products
                .Select(p => p.Product.Price.BasePrice * p.Quantity)
                .Sum();
        }

        private bool productExists(long productId, IEnumerable<ProductInShoppingCart> products)
        {
            return products
                .ToList()
                .Exists(p => p.ProductId.Equals(productId));
        }
    }
}
