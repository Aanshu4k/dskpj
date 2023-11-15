using Microsoft.AspNetCore.Mvc;
using MySqlConnector;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
namespace ProjectDSK.Controllers;

[Route("api/[controller]")]
[ApiController]

public class LoginPage : ControllerBase
{
    [HttpPost(Name = "PostLoginDetails")]
    public IActionResult POST([FromBody] Login log)
    {
        if (log == null)
        {
            return BadRequest("Invalid Data Received.");
        }
        string connectionString = "Server=localhost;User=root;Password=Aanshu30;Database=dsk";

        using (MySqlConnection connection = new MySqlConnection(connectionString))
        {
            try
            {
                connection.Open();
                string query= "Insert into login(mobileNo,Email,uuid)"+" values(@mobileNo, @Email,@uuid) ";
                using (MySqlCommand cmd = new MySqlCommand(query, connection))
                {
                    cmd.Parameters.AddWithValue("@mobileNo", log.mobileNo);
                    cmd.Parameters.AddWithValue("@Email", log.Email);
                    cmd.Parameters.AddWithValue("@uuid", log.uuid);
                    int affectedRows1 = cmd.ExecuteNonQuery();
                    if (affectedRows1 >= 0)
                    {
                        return Ok("User Login information added successfully.");
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

