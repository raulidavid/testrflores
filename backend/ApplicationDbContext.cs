using Microsoft.EntityFrameworkCore;

namespace backend
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
        public DbSet<Boilerplate.Domain.Entities.Enterprise> Enterprises { get; set; }
        public DbSet<Boilerplate.Domain.Entities.Department> Departments { get; set; }
        public DbSet<Boilerplate.Domain.Entities.Employee> Employees { get; set; }
        public DbSet<Boilerplate.Domain.Entities.DepartmentEmployee> DepartmentsEmployees { get; set; }
    }
}
