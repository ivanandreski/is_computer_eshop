using Eshop.Domain.Dto;
using Eshop.Domain.Identity;
using Eshop.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Repository.Interface
{
    public interface ICommentRepository
    {
        Task<List<UserCommentDto>> GetCommentsForUser(EshopUser user);

        Task<Comment?> Get(long id);

        Task<Comment> Create(Comment post);

        Task<Comment> Update(Comment post);

        Task<Comment> Remove(Comment post);
    }
}
