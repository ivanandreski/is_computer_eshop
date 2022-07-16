﻿using Eshop.Domain.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Domain.Model
{
    public class Comment : BaseEntity
    {
        public string Text { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime TimeOfPost { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime LastModified { get; set; }

        // Relationships

        public long ForumPostId { get; set; }
        public ForumPost ForumPost { get; set; }

        public long UserId { get; set; }
        public EshopUser User { get; set; }
    }
}
