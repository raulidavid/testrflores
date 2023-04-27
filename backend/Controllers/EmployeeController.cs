using Boilerplate.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly ILogger<EmployeeController> _logger;
        private readonly ApplicationDbContext _context;

        public EmployeeController(ILogger<EmployeeController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        [Route("employees")]
        public List<Employee> Employees()
        {
            return _context.Employees.ToList();
        }

        [HttpPost]
        [Route("create-employee")]
        public async Task<Employee> CreateEnterprise([FromBody] Employee employee)
        {
            employee.Id = Guid.NewGuid();
            employee.CreatedDate = DateTime.Now;
            employee.Status = true;
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();
            return employee;
        }

        [HttpPut]
        [Route("update-employee")]
        public async Task<Employee> UpdateEnterprise([FromBody] Employee employee)
        {
            var employeeToUpdate = await _context.Employees.FirstOrDefaultAsync(x => x.Id == employee.Id);
            employeeToUpdate!.Name = employee.Name;
            employeeToUpdate.ModifyDate = DateTime.Now;
            employeeToUpdate.ModifyBy = employee.ModifyBy;
            _context.Employees.Update(employeeToUpdate);
            await _context.SaveChangesAsync();
            return employeeToUpdate;
        }
    }
}