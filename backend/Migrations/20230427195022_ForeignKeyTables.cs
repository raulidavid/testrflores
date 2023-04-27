using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class ForeignKeyTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddForeignKey(
            schema: "dbo",
            table: "Departments",
            column: "EnterpriseId",
            name: "FK_Departments_Enterprises_EnterpriseId",
            principalSchema: "dbo",
            principalTable: "Enterprises",
            principalColumn: "Id",
            onDelete: ReferentialAction.Restrict
            );

            migrationBuilder.AddForeignKey(
            schema: "dbo",
            table: "DepartmentsEmployees",
            column: "DepartmentId",
            name: "FK_DepartmentsEmployees_Departments_Id",
            principalSchema: "dbo",
            principalTable: "Departments",
            principalColumn: "Id",
            onDelete: ReferentialAction.Restrict
            );

            migrationBuilder.AddForeignKey(
            schema: "dbo",
            table: "DepartmentsEmployees",
            column: "EmployeeId",
            name: "FK_DepartmentsEmployees_Employee_Id",
            principalSchema: "dbo",
            principalTable: "Employees",
            principalColumn: "Id",
            onDelete: ReferentialAction.Restrict
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(name: "FK_Departments_Enterprises_EnterpriseId",schema: "dbo",table: "Departments");
            migrationBuilder.DropForeignKey(name: "FK_DepartmentsEmployees_Departments_Id",schema: "dbo",table: "DepartmentsEmployees");
            migrationBuilder.DropForeignKey(name: "FK_DepartmentsEmployees_Employee_Id",schema: "dbo",table: "DepartmentsEmployees");
        }
    }
}
