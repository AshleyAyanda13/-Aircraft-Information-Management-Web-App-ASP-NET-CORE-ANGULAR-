using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Data;
using WebApplication1.DTOS;
using WebApplication1.Model;
using System.Linq;
using static System.Net.Mime.MediaTypeNames;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class InventoryController : BaseController
    {






        private readonly UserManager<AppUser> userManager;



        public InventoryController(AppDbContext appDbContext, UserManager<AppUser> userManager) : base(appDbContext)
        {


            this.userManager = userManager;
        }

       
        [Authorize]
        [HttpGet("Protected")]
   
      

        public IActionResult Get()
        {
            var items = _appDbContext.Inventory.ToList();
            
            if (items.Count == 0)
                return Ok();
             return Ok(items);
          

        

          

        }
        [HttpGet("{id:int}")]
        [Authorize()]
        public async Task<IActionResult> GetwithId(int? id)
        {

            if (id <= 0)
                return BadRequest($"Check your input and The id cannot be zero or less than zero ");
            Inventory inventory = await _appDbContext.Inventory.FindAsync(id);

            if (inventory == null)
                return BadRequest($"Inventory with id {id} not found");


            return Ok(inventory);
        }
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> postData(InventoryDTO test)

        {

            if (!ModelState.IsValid)
            {

                return BadRequest("Model is not valid");
            }



            Inventory inventory = test.MapInventory();
            await _appDbContext.Inventory.AddAsync(inventory);





            if (await _appDbContext.SaveChangesAsync() > 0)
            {

                return CreatedAtAction(nameof(postData), new { test, msg = "New booking was successfully created!" });

            }
            else
            {

                return BadRequest("Inventory not added");
            }
        }



        [HttpPut("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Update(int id, InventoryDTO holder)
        {






            if (!ModelState.IsValid)
            {


                return BadRequest("Some values is not valid");

            }


            if (id <= 0)
                return BadRequest($"Check your input and The id cannot be zero or less than zero ");
            Inventory inventory = await _appDbContext.Inventory.FindAsync(id);
            if (inventory == null)
                return BadRequest($"Inventory with id {id} not found");
            else
            {
                 

                inventory.Name = holder.Name;
                inventory.Description = holder.Description;
                inventory.CruisingSpeed = holder.CruisingSpeed;
                inventory.Manufacturer = holder.Manufacturer;
                inventory.Capacity = holder.Capacity;
                inventory.EngineType = holder.EngineType;
                inventory.AirlineUsage = holder.AirlineUsage;
                inventory.Image = holder.Image;


                _appDbContext.Inventory.Update(inventory);


            }
            if (await _appDbContext.SaveChangesAsync() > 0)
            {
                return Ok(new { msg = "Inventory was successfully updated!" });
            }
            else
            {
                return BadRequest("Inventory not updated");
            }




        }


        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {




            if (!ModelState.IsValid)
            {
                return BadRequest("Some values is not valid");
            }


            if (id <= 0)
                return BadRequest($"Check your input and The id cannot be zero or less than zero ");

            Inventory inventory = await _appDbContext.Inventory.FindAsync(id);
            if (inventory == null)
            {



                return BadRequest($"Inventory with id {id} not found");
            }
            else
            {
                _appDbContext.Inventory.Remove(inventory);

                if (await _appDbContext.SaveChangesAsync() > 0)
                {
                    return Ok(new { msg = "Inventory was successfully deleted!" });
                }
                else
                {
                    return BadRequest("Inventory not deleted");
                }


            }
        }
        [Authorize]
        [HttpGet("search")]
        public async Task<IActionResult> Search(string query)
        {
            // Directly accessing the DbContext in the controller (avoid this in large apps)
            var results = await _appDbContext.Inventory.Where(i => i.Name.Contains(query) || i.Description.Contains(query) || i.AirlineUsage.Contains(query) || i.Manufacturer.Contains(query) || i.EngineType.Contains(query)).ToListAsync();
            Console.WriteLine(results);
            return Ok(results);
        }

    }
}
