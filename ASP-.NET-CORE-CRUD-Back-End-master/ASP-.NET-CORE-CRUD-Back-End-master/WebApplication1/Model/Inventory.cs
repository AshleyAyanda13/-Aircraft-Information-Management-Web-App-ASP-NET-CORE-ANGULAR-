using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Model
{
    public class Inventory
    {

        [Key]
        [Required]
        public int? Id { get; set; }
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


    }
}
