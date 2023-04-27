using System.ComponentModel.DataAnnotations.Schema;

namespace Boilerplate.Domain.Entities;

[Table("Employees", Schema = "dbo")]
public class Employee
{
    public Guid Id { get; set; }
    public string CreatedBy { get; set; }
    public DateTime CreatedDate { get; set; }
    public string ModifyBy { get; set; }
    public DateTime ModifyDate { get; set; }
    public bool Status { get; set; }
    public string Age { get; set; }
    public string Email { get; set; }
    public string Name { get; set; }
    public string Position { get; set; }
    public string Surname { get; set; }
}