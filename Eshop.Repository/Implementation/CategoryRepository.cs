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
    public class CategoryRepository : IRepository<Category>
    {
        private readonly ApplicationDbContext _context;
        private readonly DbSet<Category> _entities;

        public CategoryRepository(ApplicationDbContext context)
        {
            _context = context;
            _entities = context.Set<Category>();
        }

        public void Create(Category entity)
        {
            _entities.Add(entity);
            _context.SaveChanges();
        }

        public void Remove(Category entity)
        {
            _entities.Remove(entity);
            _context.SaveChanges();
        }

        public Category Get(long id)
        {
            return _entities.FirstOrDefault(e => e.Id == id);
        }

        public IEnumerable<Category> GetAll()
        {
            return _entities.ToList();
        }

        public void Update(Category entity)
        {
            _entities.Update(entity);
            _context.SaveChanges();
        }
    }
}
