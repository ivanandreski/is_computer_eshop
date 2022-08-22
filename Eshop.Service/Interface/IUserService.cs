﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Eshop.Domain.Dto;
using Eshop.Domain.Identity;
using Eshop.Domain.Projections;

namespace Eshop.Service.Interface
{
    public interface IUserService
    {
        Task<List<EshopUserProjection>> GetEshopUsers(string? param);

        Task<bool> UserExists(RegisterModel model);

        Task<EshopUser?> GetByRefreshToken(string refreshToken);

        Task<EshopUserProjection?> SetRoles(SetRolesDto dto);
    }
}
