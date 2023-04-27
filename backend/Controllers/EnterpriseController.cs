using Boilerplate.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EnterpriseController : ControllerBase
    {
        private readonly ILogger<EnterpriseController> _logger;
        private readonly ApplicationDbContext _context;

        public EnterpriseController(ILogger<EnterpriseController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        [Route("enterprises")]
        public List<Enterprise> Enterprises()
        {
            return _context.Enterprises.ToList();
        }

        [HttpPost]
        [Route("create-enterprise")]
        public async Task<IActionResult> CreateEnterprise([FromBody] Enterprise enterprise)
        {
            enterprise.Id = Guid.NewGuid();
            enterprise.CreatedDate = DateTime.Now;
            enterprise.Status = true;
            _context.Enterprises.Add(enterprise);
            await _context.SaveChangesAsync();
            return Ok(enterprise);
        }

        [HttpPut]
        [Route("update-enterprise")]
        public async Task<IActionResult> UpdateEnterprise([FromBody] Enterprise enterprise)
        {
            var enterpriseToUpdate = await _context.Enterprises.FirstOrDefaultAsync(x => x.Id == enterprise.Id);
            if (enterpriseToUpdate == null)
            {
                return NotFound();
            }
            enterpriseToUpdate.Name = enterprise.Name;
            enterpriseToUpdate.Adress = enterprise.Adress;
            enterpriseToUpdate.Phone = enterprise.Phone;
            enterpriseToUpdate.ModifyDate = DateTime.Now;
            enterpriseToUpdate.ModifyBy = enterprise.ModifyBy;
            _context.Enterprises.Update(enterpriseToUpdate);
            await _context.SaveChangesAsync();
            return Ok(enterpriseToUpdate);
        }
    }
}