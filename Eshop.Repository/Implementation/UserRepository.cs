using Eshop.Domain.Identity;
using Eshop.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Repository.Implementation
{
    public class UserRepository : Interface.IUserRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly DbSet<EshopUser> _entities;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
            _entities = _context.Set<EshopUser>();
        }

        public void Create(EshopUser user)
        {
            _entities.Add(user);
            _context.SaveChanges();
        }

        public void Delete(EshopUser user)
        {
            throw new NotImplementedException();
        }

        public EshopUser Get(string userName)
        {
            return _entities.FirstOrDefault(e => e.UserName == userName);
        }

        public IEnumerable<EshopUser> GetAll()
        {
            return _entities;
        }

        public void Update(EshopUser user)
        {
            throw new NotImplementedException();
        }
    }
}
