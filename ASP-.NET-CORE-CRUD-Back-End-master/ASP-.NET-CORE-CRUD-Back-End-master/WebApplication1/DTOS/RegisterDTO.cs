using System.ComponentModel.DataAnnotations;

namespace WebApplication1.DTOS
{
    public class RegisterDTO
    {
        [EmailAddress]
        public string Email { get; set; }
        [Required]  
        public string Username { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        [Required]
        [Compare(nameof(Password))]
           [DataType(DataType.Password)]
        public string ConfirmPassword { get; set; }

    }
}
