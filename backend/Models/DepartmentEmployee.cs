using System.ComponentModel.DataAnnotations.Schema;

namespace Boilerplate.Domain.Entities;

[Table("DepartmentsEmployees", Schema = "dbo")]
public class DepartmentEmployee
{
    public Guid Id { get; set; }
    public string CreatedBy { get; set; }
    public DateTime CreatedDate { get; set; }
    public string ModifyBy { get; set; }
    public DateTime ModifyDate { get; set; }
    public bool Status { get; set; }
    public Guid DepartmentId { get; set; }
    public Guid EmployeeId { get; set; }
}