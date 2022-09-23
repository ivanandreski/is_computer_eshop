using Eshop.Domain.Identity;
using Eshop.Domain.Model;
using Eshop.Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Service.Implementation
{
    public class MailService : IMailService
    {
        private readonly string email;
        private readonly string password;
        private readonly string shopUrl;

        public MailService()
        {
            this.email = "is_homework@outlook.com";
            this.password = "ishomework1";
            this.shopUrl = "http://localhost:3200";
        }

        public void SendAddedUserMail(EshopUser user, string password)
        {
            MailMessage mail = new MailMessage();
            mail.To.Add(user.Email);
            mail.From = new MailAddress(email);
            mail.Subject = "You have been added as a user";
            mail.Body = $"An admin has added you as a user on the website.\nYour username is your email and your password is {password}.\nPlease make sure to change your password after your first login.";
            mail.IsBodyHtml = true;
            SmtpClient smtp = new SmtpClient();
            smtp.Host = "smtp-mail.outlook.com";
            smtp.Port = 587;
            smtp.UseDefaultCredentials = false;
            smtp.Credentials = new System.Net.NetworkCredential(email, this.password); // Enter senders User name and password  
            smtp.EnableSsl = true;
            smtp.Send(mail);
        }

        public void SendOrderMail(Order order)
        {
            MailMessage mail = new MailMessage();
            mail.To.Add(order.User.Email);
            mail.From = new MailAddress(email);
            mail.Subject = "Rakish order created";
            mail.Body = $"<pre>Your order has been processed succesfully.\nOrder id:{order.HashId}\nTime of purchase\n{order.TimeOfPurcahse.ToString()}\nMore details: {shopUrl}/orderDetails/{order.HashId} <pre>";
            mail.IsBodyHtml = true;
            SmtpClient smtp = new SmtpClient();
            smtp.Host = "smtp-mail.outlook.com";
            smtp.Port = 587;
            smtp.UseDefaultCredentials = false;
            smtp.Credentials = new System.Net.NetworkCredential(email, this.password); // Enter senders User name and password  
            smtp.EnableSsl = true;
            smtp.Send(mail);
        }
    }
}
