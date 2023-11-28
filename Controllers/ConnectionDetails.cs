using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySqlConnector;
using ProjectDSK;

namespace ProjectDSK.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConnectionDetails : ControllerBase
    {
        [HttpPost("PostConnectionDetails", Name = "PostConnectionDetails")]
        public IActionResult POST([FromBody] ConnectionDetailsClass cd)
        {
            if (cd == null)
            {
                return BadRequest("Invalid Data Received.");
            }
            string connectionString = "Server=localhost;User=root;Password=Aanshu30;Database=dsk";

            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    string query =
                        "INSERT INTO ConnectionDetails (type,UsageCat,Load_KVA,Load_KW,purpose,AreaType,PremisesType,BuildingType,UPIC_check,UPIC_num,FromDate,ToDate) "
                        + "VALUES (@type,@UsageCat,@Load_KVA,@Load_KW,@purpose,@AreaType,@PremisesType,@BuildingType,@UPIC_check,@UPIC_num,@FromDate,@ToDate)";

                    using (MySqlCommand cmd = new MySqlCommand(query, connection))
                    {
                        cmd.Parameters.AddWithValue("@type", cd.type);
                        cmd.Parameters.AddWithValue("@UsageCat", cd.UsageCat);
                        cmd.Parameters.AddWithValue("@Load_KVA", cd.Load_KVA);
                        cmd.Parameters.AddWithValue("@Load_KW", cd.Load_KW);
                        cmd.Parameters.AddWithValue("@purpose", cd.purpose);
                        cmd.Parameters.AddWithValue("@AreaType", cd.AreaType);
                        cmd.Parameters.AddWithValue("@PremisesType", cd.PremisesType);
                        cmd.Parameters.AddWithValue("@BuildingType", cd.BuildingType);
                        cmd.Parameters.AddWithValue("@UPIC_check", cd.UPIC_check);
                        cmd.Parameters.AddWithValue("@UPIC_num", cd.UPIC_num);
                        //DateTime fromDate = DateTime.ParseExact(cd.FromDate, "yyyy-MM-dd", null);
                        //DateTime toDate = DateTime.ParseExact(cd.ToDate, "yyyy-MM-dd", null);
                        cmd.Parameters.AddWithValue("@FromDate", cd.FromDate);
                        cmd.Parameters.AddWithValue("@ToDate", cd.ToDate);
                        int affectedRows = cmd.ExecuteNonQuery();

                        if (affectedRows > 0)
                        {
                            return Ok("User information added successfully.");
                        }
                        else
                        {
                            return StatusCode(500, "Failed to insert user.");
                        }
                    }
                }
                catch (MySqlException ex)
                {
                    Console.WriteLine("Error: " + ex.Message);
                    return StatusCode(500, "Failed to insert user.");
                }
            }
        }
    }
}
