using Microsoft.AspNetCore.Mvc;
using Sample.Test.Application.Common.Services;
using Sample.Test.Domain.Entities;
using Sample.Test.Domain.Repositories;

namespace Sample.Test.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Users : ControllerBase
    {
        private readonly IUserRepository _userService;

        public Users(IUserRepository userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> AddUser([FromBody] User user)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _userService.AddUserAsync(user);
            return Ok(user);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] User user)
        {
            if (id != user.UserID)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _userService.UpdateUserAsync(user);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            await _userService.DeleteUserAsync(id);
            return NoContent();
        }
    }
}
