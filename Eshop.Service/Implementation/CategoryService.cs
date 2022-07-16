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

        public void Create(string name)
        {
            var category = new Category();
            category.Name = name;

            _categoryRepository.Create(category);
        }

        public Category? Get(string hashedId)
        {
            var rawId = _hashService.GetRawId(hashedId);

            if (rawId != null)
            {
                var category = _categoryRepository.Get(rawId.Value);
                category.HashId = hashedId;

                return category;
            }

            return null;
        }

        public List<Category> GetAll()
        {
            var categories = _categoryRepository.GetAll().ToList();
            categories.ForEach(c => c.HashId = _hashService.GetHashedId(c.Id));

            return categories;
        }

        public void Remove(string hashedId)
        {
            var rawId = _hashService.GetRawId(hashedId);

            if (rawId != null)
            {
                var category = _categoryRepository.Get(rawId.Value);
                _categoryRepository.Remove(category);
            }

        }

        public void Update(string hashedId, string name)
        {
            var rawId = _hashService.GetRawId(hashedId);

            if (rawId != null)
            {
                var category = _categoryRepository.Get(rawId.Value);
                category.Name = name;
                _categoryRepository.Update(category);
            }
        }
    }
}
