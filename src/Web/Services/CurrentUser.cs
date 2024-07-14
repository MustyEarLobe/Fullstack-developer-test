﻿using System.Security.Claims;

using Sample.Test.Application.Common.Interfaces;

namespace Sample.Test.Web.Services;

public class Users : IUser
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public Users(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public string? Id => _httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier);
}
