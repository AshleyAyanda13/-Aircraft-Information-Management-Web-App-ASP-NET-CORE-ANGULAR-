using System.ComponentModel.DataAnnotations;

namespace WebApplication1.DTOS
{
    public class LoginDTO
    {



        [Required]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

    }
}
