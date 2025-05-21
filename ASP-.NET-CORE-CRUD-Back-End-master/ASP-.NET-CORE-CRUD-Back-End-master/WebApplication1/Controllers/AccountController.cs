using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Any;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using WebApplication1.DTOS;
using WebApplication1.Model;

namespace WebApplication1.Controllers
{
    public class AccountController : BaseController
    {
        private readonly IConfiguration _configuration;
        public AccountController(IConfiguration configuration1,UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, RoleManager<IdentityRole> roleManager) : base(userManager, signInManager, roleManager)
        {

        }

        [HttpPost, Route("Login")]
        public async Task<IActionResult> Login(LoginDTO loginDTO)

        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            AppUser appUser = await _userManager.FindByEmailAsync(loginDTO.Email);


            if (appUser == null || !await _userManager.CheckPasswordAsync(appUser, loginDTO.Password))
            {
                return Unauthorized("Invalid credentials");
            }
            else {

                var Token = GenerateJwtToken(appUser);

                return StatusCode(200, new { Message = "Loggedin Successfully", Token
                }); 

            }
        }


        private string GenerateJwtToken(AppUser user)
        {






            var jwtsecretkey = Environment.GetEnvironmentVariable("JWT_SECRET_KEY");

           


            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtsecretkey));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
    {
        
        new Claim(ClaimTypes.Email, user.Email)
    };
            var tokeOptions = new JwtSecurityToken(issuer:"https://localhost:7008", audience:"https://localhost:7008", claims, expires: DateTime.Now.AddDays(1), signingCredentials: signinCredentials);
            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
           return tokenString;
        }

        [HttpPost, Route("register")]
        public async Task<IActionResult> Register(RegisterDTO register)
        {



            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }






            AppUser appuser = new AppUser
            {
                UserName = register.Username,
                Email = register.Email
            };


            var result = await _userManager.CreateAsync(appuser, register.Password);

            if (result.Succeeded)
            {
                



                var role = _roleManager.FindByNameAsync("AppUser").Result;



                if (role == null)
                {


                    role = new IdentityRole
                    {
                        Name = "AppUser"
                    };
                    await _roleManager.CreateAsync(role);



                }

                await _userManager.AddToRoleAsync(appuser, role.Name);

                return CreatedAtAction(nameof(Register), new
                {
                    model = register,
                    errorMessage = "user created successful",
                    details = result

                });
            }
            return BadRequest(new { model = register, errorMessage = result.Errors, details = ModelState });


        }





        [Authorize]

        [HttpGet, Route("LoggedInUser")]

       
        public ActionResult LoggedIn()
        {
            var email = HttpContext.User.FindFirst(ClaimTypes.Email)?.Value;
           
            return Ok(JsonSerializer.Serialize(email));
        }




        [HttpGet, Route("AccessDenied")]

        public ActionResult AccessDenied()
        {


            return StatusCode(400, new { Message = "Access Denied", UserName = User.Identity });



        }
    }











}
