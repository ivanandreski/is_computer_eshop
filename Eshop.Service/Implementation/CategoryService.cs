using Eshop.Domain.Dto;
using Eshop.Domain.Model;
using Eshop.Domain.Relationships;
using Eshop.Repository.Interface;
using Eshop.Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Service.Implementation
{
    public class CategoryService : ICategoryService
    {
        private readonly IRepository<Category> _categoryRepository;
        private readonly IHashService _hashService;

        public CategoryService(IRepository<Category> categoryRepository, IHashService hashService)
        {
            _categoryRepository = categoryRepository;
            _hashService = hashService;
        }

        public async Task<Category> Create(string name)
        {
            var category = new Category();
            category.Name = name;

            return await _categoryRepository.Create(category);
        }

        public async Task<Category?> Get(long id)
        {
            return await _categoryRepository.Get(id);
        }

        public async Task<IEnumerable<Category>> GetAll()
        {
            return await _categoryRepository.GetAll();
        }

        public async Task<Category?> Remove(long id)
        {
            var category = await _categoryRepository.Get(id);
            if (category == null)
                return null;

            return await _categoryRepository.Remove(category);
        }

        public async Task<Category?> Update(long id, string name)
        {
            var category = await _categoryRepository.Get(id);
            if (category == null)
                return null;

            category.Name = name;

            return await _categoryRepository.Update(category);
        }
    }
}
