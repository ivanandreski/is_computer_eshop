using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Domain.Dto
{
    public class ChangePasswordDto
    {
        public string CurrentPassword { get; set; } = "";

        public string NewPassword { get; set; } = "";

        public string ConfirmPassword { get; set; } = "";

        public bool PasswordMatch()
        {
            return NewPassword == ConfirmPassword;
        }

        public bool CheckEmpty()
        {
            return string.IsNullOrEmpty(NewPassword) || string.IsNullOrEmpty(ConfirmPassword);
        }
    }
}
