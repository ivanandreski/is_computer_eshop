﻿using Eshop.Domain;
using Eshop.Domain.Dto;
using Eshop.Domain.Projections;
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

        public PagedList<T> GetPaged(PagingParameters pagingParams)
        {
            return PagedList<T>.ToPagedList(_entities, pagingParams.PageNumber, pagingParams.PageSize);
        }

        public async Task<T> Create(T entity)
        {
            _entities.Add(entity);
            await _context.SaveChangesAsync();

            return entity;
        }

        public async Task<T?> Get(long id)
        {
            return await _entities.FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task<IEnumerable<T>> GetAll()
        {
            return _entities;
        }

        public async Task<T> Remove(T entity)
        {
            _entities.Remove(entity);
            await _context.SaveChangesAsync();

            return entity;
        }

        public async Task<T> Update(T entity)
        {
            _entities.Update(entity);
            await _context.SaveChangesAsync();

            return entity;
        }

        public async Task<int> Count()
        {
            return await _entities.CountAsync();
        }
    }
}
