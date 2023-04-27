﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class Enterprise : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
            name: "Enterprises",
            columns: table => new
            {
                Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWID()"),
                CreatedBy = table.Column<string>(type: "nvarchar(max)", maxLength: 150, nullable: true),
                CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getdate()"),
                ModifyBy = table.Column<string>(type: "nvarchar(max)", maxLength: 150, nullable: true),
                ModifyDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                Status = table.Column<bool>(type: "bit", nullable: false, defaultValueSql: "0"),
                Adress = table.Column<string>(type: "nvarchar(max)", nullable: true),
                Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                Phone = table.Column<string>(type: "nvarchar(max)", nullable: true),
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Enterprises", x => x.Id);
            });

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                               name: "Enterprises");

        }
    }
}
