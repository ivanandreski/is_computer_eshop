using Eshop.Domain.Dto;
using Eshop.Domain.Dto.Filters;
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
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IShoppingCartRepository _shoppingCartRepository;
        private readonly IRepository<Store> _storeRepository;

        public OrderService(IOrderRepository orderRepository, IShoppingCartRepository shoppingCartRepository, IRepository<Store> storeRepository)
        {
            _orderRepository = orderRepository;
            _shoppingCartRepository = shoppingCartRepository;
            _storeRepository = storeRepository;
        }

        public async Task<Order?> Get(EshopUser user, long orderId)
        {
            var order = await _orderRepository.Get(orderId);
            if (order == null) return null;
            if (order.UserId != user.Id) return null;

            return order;
        }

        public async Task<IEnumerable<OrderDto>> GetOrdersAdmin(ExportOrdersFilter filter)
        {
            return (await _orderRepository.GetOrdersExport(filter))
                .Select(x => new OrderDto(x));
        }

        public async Task<List<OrderDto>> GetOrdersForUser(EshopUser user)
        {
            return (await _orderRepository.GetOrdersForUser(user))
                .Select(order => new OrderDto(order))
                .ToList();
        }

        public async Task<Order?> MakeOrder(EshopUser user, long? storeRawId)
        {
            var cart = await _shoppingCartRepository.Get(user);
            if (cart == null) return null;
            if (cart.Products.Count < 0) return null;

            var order = new Order();
            if(storeRawId != null)
            {
                var store = await _storeRepository.Get(storeRawId.Value);
                if (store == null) return null;

                order.StoreId = store.Id;
                order.Delivery = false;
            }
            else {
                order.Delivery = true;
            }
            order.TotalPrice = new Money(cart.TotalPrice.Amount);
            order.UserId = user.Id;
            order.TimeOfPurcahse = DateTime.Now;

            order = await _orderRepository.Create(order);

            foreach(var product in cart.Products)
            {
                var productInOrder = new ProductInOrder();
                productInOrder.ProductId = product.ProductId;
                productInOrder.Quantity = product.Quantity;
                productInOrder.OrderId = order.Id;

                order.Products.Add(productInOrder);
            }

            await _orderRepository.Update(order);

            return order;
        }
    }
}
