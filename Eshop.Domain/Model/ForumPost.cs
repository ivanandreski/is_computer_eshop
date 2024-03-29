﻿using Eshop.Domain.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Eshop.Domain.Model
{
    public class ForumPost : BaseEntity
    {
        public string? Title { get; set; }

        public string? Text { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime TimeOfPost { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime LastModified { get; set; }

        // Relationships

        [JsonIgnore]
        public string? UserId { get; set; }
        [JsonIgnore]
        public EshopUser? User { get; set; }

        [NotMapped]
        public string Username { get { return User?.UserName ?? ""; } }

        public virtual IEnumerable<Comment>? Comments { get; set; }
    }
}
