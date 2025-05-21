using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Model;















namespace WebApplication1.Data
{
    public class AppDbContext : IdentityDbContext<AppUser>
    {




        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Inventory> Inventory { get; set; }
    }
}
