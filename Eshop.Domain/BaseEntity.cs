using Eshop.Domain.Relationships;
using HashidsNet;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Eshop.Domain
{
    public class BaseEntity
    {
        private static readonly IHashids _hashids = new Hashids("rakish", 11);

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonIgnore]
        public long Id { get; set; }

        [NotMapped]
        public string HashId { get { return _hashids.EncodeLong(Id); } }
    }
}
