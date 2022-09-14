

using Eshop.Domain.Identity;
using Eshop.Domain.Model;
using Eshop.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace Eshop.Repository.Implementation
{
    public class ShoppingCartRepository : IShoppingCartRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly DbSet<ShoppingCart> _entities;

        public ShoppingCartRepository(ApplicationDbContext context)
        {
            _context = context;
            _entities = _context.Set<ShoppingCart>();
        }

        public async Task<ShoppingCart> Create(ShoppingCart cart)
        {
            _entities.Add(cart);
            await _context.SaveChangesAsync();

            return cart;
        }

        public async Task<ShoppingCart?> Get(EshopUser user)
        {
            return await _entities.FirstOrDefaultAsync(x => x.UserId == user.Id);
        }

        public async Task<ShoppingCart> Remove(ShoppingCart cart)
        {
            _entities.Remove(cart);
            await _context.SaveChangesAsync();

            return cart;
        }

        public async Task<ShoppingCart> Update(ShoppingCart cart)
        {
            _entities.Update(cart);
            await _context.SaveChangesAsync();

            return cart;
        }
    }
}
