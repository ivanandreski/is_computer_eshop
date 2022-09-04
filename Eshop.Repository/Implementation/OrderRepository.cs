using Eshop.Domain.Identity;
using Eshop.Domain.Model;
using Eshop.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Repository.Implementation
{
    public class OrderRepository : IOrderRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly DbSet<Order> _entities;

        public OrderRepository(ApplicationDbContext context)
        {
            _context = context;
            _entities = _context.Set<Order>();
        }

        public async Task<List<Order>> GetOrdersForUser(EshopUser user)
        {
            return await _entities.Where(order => order.UserId == user.Id).ToListAsync();
        }
    }
}
