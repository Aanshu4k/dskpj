using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySqlConnector;
using ProjectDSK;

namespace ProjectDSK.Controllers;

[Route("api/[controller]")]
[ApiController]
public class Address : ControllerBase
{
    [HttpPost(Name = "PostAddressDetails")]
    public IActionResult POST([FromBody] AddressClass addr)
    {
        if (addr == null)
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
                    "INSERT INTO address_comm (HNo,Floor,BuildName,Street,Area,LandmarkDetails,CityPostalCode,NearLoc,Division,LandmarkIndicate) "
                    + "VALUES (@HNo,@Floor,@BuildName,@Street,@Area,@LandmarkDetails,@CityPostalCode,@NearLoc,@Division,@LandmarkIndicate)";

                using (MySqlCommand cmd = new MySqlCommand(query, connection))
                {
                    cmd.Parameters.AddWithValue("@HNo", addr.HNo);
                    cmd.Parameters.AddWithValue("@Floor", addr.Floor);
                    cmd.Parameters.AddWithValue("@BuildName", addr.BuildName);
                    cmd.Parameters.AddWithValue("@Street", addr.Street);
                    cmd.Parameters.AddWithValue("@Area", addr.Area);
                    cmd.Parameters.AddWithValue("@LandmarkDetails", addr.LandmarkDetails);
                    cmd.Parameters.AddWithValue("@CityPostalCode", addr.CityPostalCode);
                    cmd.Parameters.AddWithValue("@NearLoc", addr.NearLoc);
                    cmd.Parameters.AddWithValue("@Division", addr.Division);
                    cmd.Parameters.AddWithValue("@LandmarkIndicate", addr.LandmarkIndicate);

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
    [HttpGet("Get_floor_mst", Name = "Get_floor_mst")]
    public IActionResult Getfloor_mst()
    {
        try
        {
            string connectionString = "Server=localhost;User=root;Password=Aanshu30;Database=dsk";
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                connection.Open();
                string query = "SELECT * FROM floor_mst";
                using (MySqlCommand cmd = new MySqlCommand(query, connection))
                {
                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        var floorArray = new List<object>();
                        while (reader.Read())
                        {
                            var floorObject = new
                            {
                                floor_id = Convert.ToInt32(reader["floor_id"]),
                                floor = reader["floor"].ToString(),
                            };
                            floorArray.Add(floorObject);
                        }
                        return Ok(floorArray);
                    }
                }
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error: {ex.Message}");
        }
    }
    //[HttpPost(Name = "PostSupplyAddressDetails")]
    //public IActionResult POSTSupplyAddress([FromBody] supplyAddressClass adds)
    //{
    //    if (adds == null)
    //    {
    //        return BadRequest("Invalid Data Received.");
    //    }
    //    string connectionString = "Server=localhost;User=root;Password=Aanshu30;Database=dsk";

    //    using (MySqlConnection connection = new MySqlConnection(connectionString))
    //    {
    //        try
    //        {
    //            connection.Open();
    //            string query =
    //                "INSERT INTO address_supply (HNo,Floor,BuildName,Street,Area,LandmarkDetails,CityPostalCode,NearLoc,Division,LandmarkIndicate) "
    //                + "VALUES (@HNo,@Floor,@BuildName,@Street,@Area,@LandmarkDetails,@CityPostalCode,@NearLoc,@Division,@LandmarkIndicate)";
    //            using (MySqlCommand cmd = new MySqlCommand(query, connection))
    //            {
    //                cmd.Parameters.AddWithValue("@HNo", adds.HNo);
    //                cmd.Parameters.AddWithValue("@Floor", adds.Floor);
    //                cmd.Parameters.AddWithValue("@BuildName", adds.BuildName);
    //                cmd.Parameters.AddWithValue("@Street", adds.Street);
    //                cmd.Parameters.AddWithValue("@Area", adds.Area);
    //                cmd.Parameters.AddWithValue("@LandmarkDetails", adds.LandmarkDetails);
    //                cmd.Parameters.AddWithValue("@CityPostalCode", adds.CityPostalCode);
    //                cmd.Parameters.AddWithValue("@NearLoc", adds.NearLoc);
    //                cmd.Parameters.AddWithValue("@Division", adds.Division);
    //                cmd.Parameters.AddWithValue("@LandmarkIndicate", adds.LandmarkIndicate);

    //                int affectedRows = cmd.ExecuteNonQuery();

    //                if (affectedRows > 0)
    //                {
    //                    return Ok("User information added successfully.");
    //                }
    //                else
    //                {
    //                    return StatusCode(500, "Failed to insert user.");
    //                }
    //            }
    //        }
    //        catch (MySqlException ex)
    //        {
    //            Console.WriteLine("Error: " + ex.Message);
    //            return StatusCode(500, "Failed to insert user.");
    //        }
    //    }
    //}
}
