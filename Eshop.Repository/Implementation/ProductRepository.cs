using Eshop.Repository.Interface;
using Eshop.Domain.Dto;
using Eshop.Domain.Projections;
using Microsoft.EntityFrameworkCore;
using Eshop.Domain.Model;
using Eshop.Domain.Dto.Filters;
using Eshop.Domain.Relationships;

namespace Eshop.Repository.Implementation
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly DbSet<Product> _entities;

        public ProductRepository(ApplicationDbContext context)
        {
            _context = context;
            _entities = _context.Set<Product>();
        }

        public PagedList<ProductCardDto> GetPaged(PagingParameters pagingParams, ProductFilter filter)
        {
            IQueryable<Product> query = _entities.Where(product => !product.Discontinued);

            if (!string.IsNullOrEmpty(filter.CategoryHash))
                query = query.Where(product => product.CategoryId == Convert.ToInt64(filter.CategoryHash));
            if (!string.IsNullOrEmpty(filter.SearchParams))
                query = query.Where(product => product.Name.ToLower().Contains(filter.SearchParams.ToLower()));

            var items = query.Select(item => new ProductCardDto(item));

            return PagedList<ProductCardDto>.ToPagedList(items, pagingParams.PageNumber, pagingParams.PageSize);
        }

        public async Task<Product> Create(Product entity)
        {
            _entities.Add(entity);
            await _context.SaveChangesAsync();

            return entity;
        }

        public async Task<Product?> Get(long id)
        {
            return await _entities.FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task<IEnumerable<Product>> GetAll()
        {
            return await _entities.ToListAsync();
        }

        public async Task<Product> Remove(Product entity)
        {
            _entities.Remove(entity);
            await _context.SaveChangesAsync();

            return entity;
        }

        public async Task<Product> Update(Product entity)
        {
            _entities.Update(entity);
            await _context.SaveChangesAsync();

            return entity;
        }

        public async Task<int> Count()
        {
            return await _entities.CountAsync();
        }

        public async Task<IEnumerable<ProductPcBuildDto>> GetAllFromCategory(long categoryId)
        {
            return _entities.Where(x => x.CategoryId == categoryId)
                .Select(x => new ProductPcBuildDto(x));
        }

        public async Task<Product?> GetProductByName(string title)
        {
            return await _entities.FirstOrDefaultAsync(x => x.Name == title);
        }

        public async Task<IEnumerable<ProductInStore>> GetProductAvailability(long productId)
        {
            var product = await _entities
                .Include(x => x.ProductsInStore)
                .FirstOrDefaultAsync(x => x.Id == productId);
            if (product == null) return Enumerable.Empty<ProductInStore>();

            return product.ProductsInStore;
        }
    }
}

