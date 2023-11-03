using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ProjectDSK.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MyRequest : ControllerBase
    {
        public string? RequestNo { get; internal set; }
        public string? Company { get; internal set; }
        public string? District { get; internal set; }
        public string? Name { get; internal set; }
        public string? Email { get; internal set; }
        public string? MobileNo { get; internal set; }
        public string? EntryDate { get; internal set; }
    }
}
