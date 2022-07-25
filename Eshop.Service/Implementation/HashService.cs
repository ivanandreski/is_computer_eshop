using Eshop.Domain.Identity;
using Eshop.Service.Interface;
using HashidsNet;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Service.Implementation
{
    public class HashService : IHashService
    {
        private readonly IHashids _hashids;

        public HashService(IHashids hashids)
        {
            _hashids = hashids;
        }

        public string GetHashedId(long id)
        {
            return _hashids.EncodeLong(id);
        }

        public long? GetRawId(string hashId)
        {
            try
            {
                var id = _hashids.DecodeLong(hashId);

                if (id == null)
                    return null;

                return id[0];
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
            }
            
            return null;
        }

        //public string GetHashedPassword(string rawPassword)
        //{
        //    return BCrypt.Net.BCrypt.HashPassword(rawPassword);
        //}

        //public bool PasswordsMatch(string rawPassword, EshopUser user)
        //{
        //    return BCrypt.Net.BCrypt.Verify(rawPassword, user.);
        //}
    }
}
