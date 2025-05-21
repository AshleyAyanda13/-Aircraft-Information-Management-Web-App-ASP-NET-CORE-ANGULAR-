using System.ComponentModel.DataAnnotations;
using WebApplication1.Model;
namespace WebApplication1.DTOS
{
    public class InventoryDTO
    {

        [Required]
        public string? Name { get; set; }
        [Required]
        public string? Manufacturer { get; set; }
        [Required]
        public string? Description { get; set; }
        [Required]
        public string? EngineType { get; set; }
        [Required]
        public int Capacity { get; set; }
        [Required]
        public int? CruisingSpeed { get; set; }
        [Required]
        public string? AirlineUsage { get; set; }
        [Required]
        public string? Image { get; set; }



        public Inventory MapInventory() => new Inventory()

        {



            Name=this.Name,
            Manufacturer=this.Manufacturer,
            Description = this.Description,
            EngineType=this.EngineType,
            Capacity=this.Capacity,
            CruisingSpeed=this.CruisingSpeed,
            AirlineUsage=this.AirlineUsage,
            Image=this.Image,





        };









    }
}
