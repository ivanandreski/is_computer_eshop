using Eshop.Domain.Dto;
using Eshop.Domain.Identity;
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

        public OrderService(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        public async Task<List<OrderDto>> GetOrdersForUser(EshopUser user)
        {
            return (await _orderRepository.GetOrdersForUser(user))
                .Select(order => new OrderDto(order))
                .ToList();
        }
    }
}
