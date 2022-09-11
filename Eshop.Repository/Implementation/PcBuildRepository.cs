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
    public class PcBuildRepository : IPcBuildRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly DbSet<PCBuild> _entities;

        public PcBuildRepository(ApplicationDbContext context)
        {
            _context = context;
            _entities = _context.Set<PCBuild>();
        }

        public async Task<PCBuild> Create(PCBuild pcBuild)
        {
            await _entities.AddAsync(pcBuild);
            await _context.SaveChangesAsync();

            return pcBuild;
        }

        public async Task<PCBuild?> Get(long id)
        {
            return await _entities.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<PCBuild?> GetUserPcBuild(EshopUser user)
        {
            return await _entities.FirstOrDefaultAsync(x => x.UserId == user.Id);
        }

        public async Task<PCBuild> Remove(PCBuild pcBuild)
        {
            _entities.Remove(pcBuild);
            await _context.SaveChangesAsync();

            return pcBuild;
        }

        public async Task<PCBuild> Update(PCBuild pcBuild)
        {
            _entities.Update(pcBuild);
            await _context.SaveChangesAsync();

            return pcBuild;
        }
    }
}
