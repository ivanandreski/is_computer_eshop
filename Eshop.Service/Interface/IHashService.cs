using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Service.Interface
{
    public interface IHashService
    {
        string GetHashedId(long id);

        long? GetRawId(string hashId);

        string GetHashedPassword(string rawPassword);

        string GetRawPassword(string rawPassword);
    }
}
