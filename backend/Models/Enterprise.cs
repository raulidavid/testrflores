using System.ComponentModel.DataAnnotations.Schema;

namespace Boilerplate.Domain.Entities;

[Table("Enterprises", Schema = "dbo")]
public class Enterprise
{
    public Guid Id { get; set; }
    public string CreatedBy { get; set; }
    public DateTime CreatedDate { get; set; }
    public string ModifyBy { get; set; }
    public DateTime ModifyDate { get; set; }
    public bool Status { get; set; }
    public string Adress { get; set; }
    public string Name { get; set; }
    public string Phone { get; set; }
}