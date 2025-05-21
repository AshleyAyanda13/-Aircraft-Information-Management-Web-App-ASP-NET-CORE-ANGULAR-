using Microsoft.AspNetCore.Mvc;
using WebApplication1.Data;
using Microsoft.AspNetCore.Identity;
using System;
using WebApplication1.Model;



namespace WebApplication1.Controllers
{






    [Route("api/[controller]")]
    [ApiController]
    public class BaseController : ControllerBase
    {
        protected readonly AppDbContext _appDbContext;
        protected readonly UserManager<AppUser> _userManager;
        protected readonly SignInManager<AppUser> _signInManager;
        protected readonly RoleManager<IdentityRole> _roleManager;

        public BaseController(AppDbContext appDbContext)
        {
        
        
        
        _appDbContext = appDbContext;
        }



        public BaseController(UserManager<AppUser> userManager,SignInManager<AppUser> signInManager,RoleManager<IdentityRole> roleManager) 
        {
        
             _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
        
        
        
        
        }




    }
}
