using Microsoft.AspNetCore.Mvc;

namespace StudentAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentsController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetStudents()
        {
            var students = new[]
            {
                new { Id = 1, Name = "Aarav Sharma", Department = "CSE", Semester = 6 },
                new { Id = 2, Name = "Kavya Singh", Department = "ECE", Semester = 5 },
                new { Id = 3, Name = "Rahul Verma", Department = "IT", Semester = 7 },
            };
            return Ok(students);
        }
    }
}
