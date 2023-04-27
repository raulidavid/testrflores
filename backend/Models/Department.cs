using System.ComponentModel.DataAnnotations.Schema;

namespace Boilerplate.Domain.Entities;

[Table("Departments", Schema = "dbo")]
public class Department
{
    public Guid Id { get; set; }
    public string CreatedBy { get; set; }
    public DateTime CreatedDate { get; set; }
    public string ModifyBy { get; set; }
    public DateTime ModifyDate { get; set; }
    public bool Status { get; set; }
    public string Description { get; set; }
    public string Name { get; set; }
    public string Phone { get; set; }
    public Guid EnterpriseId { get; set; }
}