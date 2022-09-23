using Eshop.Domain.Identity;
using Eshop.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Service.Interface
{
    public interface IMailService
    {
        void SendOrderMail(Order order);

        void SendAddedUserMail(EshopUser user, string password);
    }
}
