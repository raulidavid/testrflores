using Boilerplate.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DepartmentController : ControllerBase
    {
        private readonly ILogger<DepartmentController> _logger;
        private readonly ApplicationDbContext _context;

        public DepartmentController(ILogger<DepartmentController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        [Route("departments")]
        public List<Department> Departments()
        {
            return _context.Departments.ToList();
        }

        [HttpPost]
        [Route("create-department")]
        public async Task<Department> CreateEnterprise([FromBody] Department department)
        {
            department.Id = Guid.NewGuid();
            department.CreatedDate = DateTime.Now;
            department.Status = true;
            _context.Departments.Add(department);
            await _context.SaveChangesAsync();
            return department;
        }

        [HttpPut]
        [Route("update-department")]
        public async Task<Department> UpdateEnterprise([FromBody] Department department)
        {
            var departmentToUpdate = await _context.Departments.FirstOrDefaultAsync(x => x.Id == department.Id);
            departmentToUpdate!.Name = department.Name;
            departmentToUpdate.Description = department.Description;
            departmentToUpdate.Phone = department.Phone;
            departmentToUpdate.ModifyDate = DateTime.Now;
            departmentToUpdate.ModifyBy = department.ModifyBy;
            _context.Departments.Update(departmentToUpdate);
            await _context.SaveChangesAsync();
            return departmentToUpdate;
        }
    }
}