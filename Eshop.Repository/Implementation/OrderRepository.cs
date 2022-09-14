using Eshop.Domain.Dto.Filters;
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

        public async Task<Order> Create(Order order)
        {
            _entities.Add(order);
            await _context.SaveChangesAsync();

            return await _entities.FirstOrDefaultAsync(x => x.TimeOfPurcahse == order.TimeOfPurcahse);
        }

        public async Task<Order?> Get(long orderId)
        {
            return await _entities.FirstOrDefaultAsync(x => x.Id == orderId);
        }

        public async Task<IEnumerable<Order>> GetOrdersExport(ExportOrdersFilter filter)
        {
            IQueryable<Order> query = _entities.AsQueryable();
            if (!string.IsNullOrWhiteSpace(filter.SearchParams))
            {
                query = _entities.Where(x => x.User.UserName.ToLower().Contains(filter.SearchParams.ToLower()));
            }
            if (filter.DateFrom != null)
            {
                query = query.Where(x => x.TimeOfPurcahse.Date > filter.DateFrom.Value.Date);
            }
            if (filter.DateTo != null)
            {
                query = query.Where(x => x.TimeOfPurcahse.Date < filter.DateTo.Value.Date);
            }

            return query;
        }

        public async Task<List<Order>> GetOrdersForUser(EshopUser user)
        {
            return await _entities.Where(order => order.UserId == user.Id).ToListAsync();
        }

        public async Task<Order> Update(Order order)
        {
            _entities.Update(order);
            await _context.SaveChangesAsync();

            return order;
        }
    }
}
