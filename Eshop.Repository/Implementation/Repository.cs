using Eshop.Domain;
using Eshop.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Repository.Implementation
{
    public class Repository<T> : IRepository<T> where T : BaseEntity
    {
        private readonly ApplicationDbContext _context;
        private readonly DbSet<T> _entities;

        public Repository(ApplicationDbContext context)
        {
            _context = context;
            _entities = _context.Set<T>();
        }

        public void Create(T entity)
        {
            _entities.Add(entity);
            _context.SaveChangesAsync();
        }

        public T Get(long id)
        {
            return _entities.FirstOrDefault(e => e.Id == id);
        }

        public IEnumerable<T> GetAll()
        {
            return _entities.ToList();
        }

        public void Remove(T entity)
        {
            _entities.Remove(entity);
            _context.SaveChangesAsync();
        }

        public void Update(T entity)
        {
            _entities.Update(entity);
            _context.SaveChangesAsync();
        }
    }
}
