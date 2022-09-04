using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Domain.Dto
{
    public class CommentDto
    {
        public string Text { get; set; } = "";

        public string PostHashId { get; set; } = "";

        public long PostId { get; set; }
    }
}
