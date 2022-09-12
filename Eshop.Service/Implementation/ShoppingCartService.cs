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
        //private readonly IRepository<ShoppingCart> _shoppingCartRepository;
        //private readonly IRepository<ProductInShoppingCart> _productInShoppingCartRepository;
        private readonly IRepository<Store> _storeRepository;
        //private readonly IRepository<Product> _productRepository;
        private readonly IShoppingCartRepository _shoppingCartRepository;
        private readonly IProductRepository _productRepository;

        public ShoppingCartService(IRepository<Store> storeRepository, IShoppingCartRepository shoppingCartRepository, IProductRepository productRepository)
        {
            _storeRepository = storeRepository;
            _shoppingCartRepository = shoppingCartRepository;
            _productRepository = productRepository;
        }

        public async Task<ShoppingCart> AddProduct(EshopUser user, long productId)
        {
            var cart = await _shoppingCartRepository.Get(user);
            if (cart == null)
            {
                await this.Create(user);
                cart = await _shoppingCartRepository.Get(user);
            }

            var product = await _productRepository.Get(productId);

            if (cart != null && product != null)
            {
                ProductInShoppingCart? pshp = cart.Products.FirstOrDefault(x => x.ProductId == product.Id);
                if (pshp == null)
                {
                    pshp = new ProductInShoppingCart();
                    pshp.ShoppingCart = cart;
                    pshp.ShoppingCartId = cart.Id;
                    pshp.Product = product;
                    pshp.ProductId = product.Id;
                    pshp.Quantity = 1;
                    cart.Products.Add(pshp);
                }
                else
                {
                    pshp.Quantity += 1;
                }

                cart.TotalPrice = new Money(CalculateTotalPrice(cart.Products));
                cart.LastModified = DateTime.Now;
            }

            return await _shoppingCartRepository.Update(cart);
        }

        public async Task<ShoppingCart?> ChangeQuantity(EshopUser user, long productInCartId, int quantity)
        {
            var cart = await _shoppingCartRepository.Get(user);
            if (cart == null) return null;

            var pshp = cart.Products.FirstOrDefault(x => x.Id == productInCartId);
            if (pshp == null)
                return null;

            if (quantity < 1)
            {
                pshp.Quantity = 1;
            }
            else
            {
                pshp.Quantity = quantity;
            }

            cart.TotalPrice = new Money(CalculateTotalPrice(cart.Products));
            cart.LastModified = DateTime.Now;

            return await _shoppingCartRepository.Update(cart);
        }

        public async Task<ShoppingCart?> RemoveProduct(EshopUser user, long productInCartId)
        {
            var cart = await _shoppingCartRepository.Get(user);
            if (cart == null) return null;

            var pshp = cart.Products.FirstOrDefault(x => x.Id == productInCartId);
            if (pshp == null)
                return null;

            cart.Products.Remove(pshp);
            cart.TotalPrice = new Money(CalculateTotalPrice(cart.Products));
            cart.LastModified = DateTime.Now;

            return await _shoppingCartRepository.Update(cart);
        }

        public async Task<ShoppingCart> Clear(EshopUser user)
        {
            var cart = await _shoppingCartRepository.Get(user);

            cart.TotalPrice = new Money(0);
            cart.Products = new List<ProductInShoppingCart>();
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
            var cart = await _shoppingCartRepository.Get(user);

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
            var cart = await _shoppingCartRepository.Get(user);
            if (cart == null)
            {
                await this.Create(user);
                cart = await _shoppingCartRepository.Get(user);
            }

            return cart;
        }

        // Helper methods

        private double CalculateTotalPrice(IEnumerable<ProductInShoppingCart> products)
        {
            return products
                .Select(p => (p.Product?.Price?.Amount ?? 0.0) * p.Quantity)
                .Sum();
        }

        private bool productExists(long productId, List<ProductInShoppingCart> products)
        {
            return products.Exists(p => p.ProductId.Equals(productId));
        }
    }
}
