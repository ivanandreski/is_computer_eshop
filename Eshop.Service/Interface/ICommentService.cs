using Eshop.Domain.Dto;
using Eshop.Domain.Identity;
using Eshop.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Service.Interface
{
    public interface ICommentService
    {
        Task<List<UserCommentDto>> GetCommentsForUser(EshopUser user);

        Task<Comment?> Get(long id);

        Task<Comment?> Create(CommentDto dto, EshopUser user);

        Task<Comment?> Update(CommentDto dto, long id, EshopUser user);

        Task<Comment?> Remove(long id, EshopUser user);
    }
}
