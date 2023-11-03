using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySqlConnector;
using ProjectDSK;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace ProjectDSK.Controllers;


[Route("api/[controller]")]
[ApiController]
public class NewConnection : ControllerBase
{
    [HttpGet("Get_Ctype_mst")]
    public IEnumerable<Ctype_mst> GetCtype_mst()
    {
        string connectionString = "Server=localhost;User=root;Password=Aanshu30;Database=dsk";

        List<Ctype_mst> MasterData = new List<Ctype_mst>();

        using (MySqlConnection connection = new MySqlConnection(connectionString))
        {
            try
            {
                connection.Open();
                Console.WriteLine("Connected to the MySQL database.");
                string sqlQuery = "SELECT * FROM ctype_mst";
                using (MySqlCommand cmd = new MySqlCommand(sqlQuery, connection))
                {
                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Ctype_mst md = new Ctype_mst
                            {
                                 ConsumerType = reader["ConsumerType"].ToString(),
                                 Ct_id = reader["Ct_id"].ToString(),
                            };
                            MasterData.Add(md);
                        }
                    }
                }
            }
            catch (MySqlException ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
        }
        return MasterData;
    }
    [HttpGet(Name = "GetConsumerDetails")]
    public IEnumerable<ConsumerDetails> Get()
    {
        string connectionString = "Server=localhost;User=root;Password=Aanshu30;Database=dsk";

        List<ConsumerDetails> ConsumerDetailsList = new List<ConsumerDetails>();

        using (MySqlConnection connection = new MySqlConnection(connectionString))
        {
            try
            {
                connection.Open();
                Console.WriteLine("Connected to the MySQL database.");
   
                string sqlQuery = "SELECT RequestNo,ConsumerType,title,name,salutation,FHname,FirmName,Authorname,DesigOfSig,OrgType,IncorpDate,GSTNo,PANNo,EntryDate from Cinfo";
                using (MySqlCommand cmd = new MySqlCommand(sqlQuery, connection))
                {
                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            ConsumerDetails ConsumerDetails = new ConsumerDetails
                            {
                                RequestNo = reader["RequestNo"].ToString(),
                                ConsumerType = reader["ConsumerType"].ToString(),
                                Title = reader["Title"].ToString(),
                                Name = reader["Name"].ToString(),
                                salutation = reader["salutation"].ToString(),
                                FHname = reader["FHname"].ToString(),
                                FirmName = reader["FirmName"].ToString(),
                                Authorname = reader["Authorname"].ToString(),
                                DesigOfSig = reader["DesigOfSig"].ToString(),
                                OrgType = reader["OrgType"].ToString(),
                                IncorpDate = reader["IncorpDate"].ToString(),
                                GSTNo = reader["GSTNo"].ToString(),
                                PANNo = reader["PANNo"].ToString(),
                                EntryDate = reader["EntryDate"].ToString(),
                            };
                                ConsumerDetailsList.Add(ConsumerDetails);
                        }
                    }
                }
            }
            catch (MySqlException ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
        }
        return ConsumerDetailsList;
    }

    [HttpPost(Name = "PostConsumerDetails")]
    public IActionResult POST([FromBody] ConsumerDetails ud)
    {
        if (ud == null)
        {
            return BadRequest("Invalid Data Received.");
        }

        string connectionString = "Server=localhost;User=root;Password=Aanshu30;Database=dsk";

        using (MySqlConnection connection = new MySqlConnection(connectionString))
        {
            try
            {
                connection.Open();
                string query1 = "INSERT IGNORE INTO cinfo (RequestNo,ConsumerType,Title,name,salutation,fhname,FirmName,Authorname,DesigOfSig,OrgType,IncorpDate,GSTNo,PANNo,EntryDate) " +
                    "VALUES (@RequestNo,@ConsumerType,@title,@name,@salutation,@fhname,@FirmName,@Authorname,@DesigOfSig,@OrgType,@IncorpDate,@GSTNo,@PANNo,@EntryDate)";
                //IEnumerable<Ctype_mst> ConsumerType = GetCtype_mst();
                using (MySqlCommand cmd1 = new MySqlCommand(query1, connection)) 
                {
                    cmd1.Parameters.AddWithValue("@RequestNo", ud.RequestNo);
                    cmd1.Parameters.AddWithValue("@ConsumerType", ud.ConsumerType);
                    cmd1.Parameters.AddWithValue("@Title", ud.Title);
                    cmd1.Parameters.AddWithValue("@name", ud.Name);
                    cmd1.Parameters.AddWithValue("@salutation", ud.salutation);
                    cmd1.Parameters.AddWithValue("@fhname", ud.FHname);
                    cmd1.Parameters.AddWithValue("@FirmName", ud.FirmName);
                    cmd1.Parameters.AddWithValue("@Authorname", ud.Authorname);
                    cmd1.Parameters.AddWithValue("@DesigOfSig", ud.DesigOfSig);
                    cmd1.Parameters.AddWithValue("@OrgType", ud.OrgType);
                    cmd1.Parameters.AddWithValue("@IncorpDate", ud.IncorpDate);
                    cmd1.Parameters.AddWithValue("@GSTNo", ud.GSTNo);
                    cmd1.Parameters.AddWithValue("@PANNo", ud.PANNo);
                    cmd1.Parameters.AddWithValue("@EntryDate", ud.EntryDate);
                    int affectedRows1 = cmd1.ExecuteNonQuery();

                    if (affectedRows1 >= 0)
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
    [HttpGet("GetMyRequest")]
    public IEnumerable<MyRequestData> GetMyRequest()
    {
        string connectionString = "Server=localhost;User=root;Password=Aanshu30;Database=dsk";

        List<MyRequestData> myRequestDataList = new List<MyRequestData>();

        using (MySqlConnection connection = new MySqlConnection(connectionString))
        {
            try
            {
                connection.Open();
                Console.WriteLine("Connected to the MySQL database.");
                string sqlQuery = "SELECT RequestNo,Name,EntryDate,ConsumerType,Authorname FROM cinfo";
                using (MySqlCommand cmd = new MySqlCommand(sqlQuery, connection))
                {
                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            MyRequestData myRequestData = new MyRequestData
                            {
                                RequestNo = reader["RequestNo"].ToString(),
                                Name = reader["Name"].ToString(),
                                EntryDate = reader["EntryDate"].ToString(),
                                ConsumerType = reader["ConsumerType"].ToString(),
                                Authorname = reader["Authorname"].ToString(),
                                //District= reader["District"].ToString(),
                                //RequestType= reader["RequestType"].ToString(),
                                //Email= reader["Email"].ToString(),
                                //MobileNo= reader["MobileNo"].ToString(),
                                //EntryDate= reader["EntryDate"].ToString(),
                            };
                            myRequestDataList.Add(myRequestData);
                        }
                    }
                }
            }
            catch (MySqlException ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
        }
        return myRequestDataList;
    }
    //API for SaveAsDraft feature
    [HttpPost("SaveDraft")]
    public IActionResult SaveDraft([FromBody] ConsumerDetails draftData)
    {
        if (draftData == null)
        {
            return BadRequest("Invalid Data Received.");
        }

        string connectionString = "Server=localhost;User=root;Password=Aanshu30;Database=dsk";

        using (MySqlConnection connection = new MySqlConnection(connectionString))
        {
            try
            {
                connection.Open();
                string query = "Insert INTO cinfo (RequestNo, ConsumerType, Title, name, salutation, FHname, FirmName, Authorname, DesigOfSig, OrgType, IncorpDate, GSTNo, PANNo,EntryDate) " +
                    "VALUES (@RequestNo, @ConsumerType, @Title, @name, @salutation, @FHname, @FirmName, @Authorname, @DesigOfSig, @OrgType, @IncorpDate, @GSTNo, @PANNo, @EntryDate) " +
                    "ON DUPLICATE KEY UPDATE ConsumerType = VALUES(ConsumerType), Title = VALUES(Title), name = VALUES(name), " +
                    "salutation = VALUES(salutation), FHname = VALUES(FHname), FirmName = VALUES(FirmName), Authorname = VALUES(Authorname), " +
                    "DesigOfSig = VALUES(DesigOfSig), OrgType = VALUES(OrgType), IncorpDate = VALUES(IncorpDate), GSTNo = VALUES(GSTNo), PANNo = VALUES(PANNo)";

                using (MySqlCommand cmd = new MySqlCommand(query, connection))
                {
                    cmd.Parameters.AddWithValue("@RequestNo", draftData.RequestNo);
                    cmd.Parameters.AddWithValue("@ConsumerType", draftData.ConsumerType);
                    cmd.Parameters.AddWithValue("@Title", draftData.Title);
                    cmd.Parameters.AddWithValue("@name", draftData.Name);
                    cmd.Parameters.AddWithValue("@salutation", draftData.salutation);
                    cmd.Parameters.AddWithValue("@FHname", draftData.FHname);
                    cmd.Parameters.AddWithValue("@FirmName", draftData.FirmName);
                    cmd.Parameters.AddWithValue("@Authorname", draftData.Authorname);
                    cmd.Parameters.AddWithValue("@DesigOfSig", draftData.DesigOfSig);
                    cmd.Parameters.AddWithValue("@OrgType", draftData.OrgType);
                    cmd.Parameters.AddWithValue("@IncorpDate", draftData.IncorpDate);
                    cmd.Parameters.AddWithValue("@GSTNo", draftData.GSTNo);
                    cmd.Parameters.AddWithValue("@PANNo", draftData.PANNo);
                    cmd.Parameters.AddWithValue("@EntryDate", draftData.EntryDate);
                    //cmd.Parameters.AddWithValue("@PANNo", draftData.ImageData);

                    //cmd.Parameters.AddWithValue("@PANNo", draftData.SignatureData);
                    int affectedRows = cmd.ExecuteNonQuery();

                    if (affectedRows > 0)
                    {
                        return Ok("Draft saved successfully.");
                    }
                    else
                    {
                        return StatusCode(500, "Failed to save draft.");
                    }
                }
            }
            catch (MySqlException ex)
            {
                Console.WriteLine("Error: " + ex.Message);
                return StatusCode(500, "Failed to save draft.");
            }
        }
    }

    //[HttpPost("PostMyRequest")]
    //public IActionResult PostMyRequest([FromBody] MyRequestData md)
    //{
    //    if (md == null)
    //    {
    //        return BadRequest("Invalid Data Received.");
    //    }

    //    string connectionString = "Server=localhost;User=root;Password=Aanshu30;Database=dsk";

    //    using (MySqlConnection connection = new MySqlConnection(connectionString))
    //    {
    //        try
    //        {
    //            connection.Open();
    //            string query = "INSERT INTO myrequest (RequestNo, Company, Name, District, Email, MobileNo, EntryDate) " +
    //                "VALUES (@RequestNo, @Company, @Name, @District, @Email, @MobileNo, @EntryDate)";

    //            using (MySqlCommand cmd = new MySqlCommand(query, connection))
    //            {
    //                cmd.Parameters.AddWithValue("@RequestNo", md.RequestNo);
    //                cmd.Parameters.AddWithValue("@Company", md.Company);
    //                cmd.Parameters.AddWithValue("@Name", md.Name);
    //                cmd.Parameters.AddWithValue("@District", md.District);
    //                cmd.Parameters.AddWithValue("@RequestType", md.RequestType);
    //                cmd.Parameters.AddWithValue("@Email", md.Email);
    //                cmd.Parameters.AddWithValue("@MobileNo", md.MobileNo);
    //                cmd.Parameters.AddWithValue("@EntryDate", md.EntryDate);

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
    //            return StatusCode(500, "Failed to insert user. Error: " + ex.Message);
    //        }
    //    }
    //}


    //[HttpPost("UploadImage")]
    //public async Task<IActionResult> UploadImage(IFormFile photo, IFormFile signature)
    //{
    //    if (photo == null || signature == null)
    //    {
    //        return BadRequest("Invalid Data Received.");
    //    }

    //    try
    //    {
    //        byte[] photoData;
    //        byte[] signatureData;

    //        using (MemoryStream photoStream = new MemoryStream())
    //        using (MemoryStream signatureStream = new MemoryStream())
    //        {
    //            await photo.CopyToAsync(photoStream);
    //            await signature.CopyToAsync(signatureStream);
    //            photoData = photoStream.ToArray();
    //            signatureData = signatureStream.ToArray();
    //        }

    //        string connectionString = "Server=localhost;User=root;Password=Aanshu30;Database=dsk";
    //        using (MySqlConnection connection = new MySqlConnection(connectionString))
    //        {
    //            connection.Open();

    //            string query = "INSERT INTO cinfo (PhotoData, SignatureData) VALUES (@photoData, @signatureData)";

    //            using (MySqlCommand cmd = new MySqlCommand(query, connection))
    //            {
    //                cmd.Parameters.Add("@photoData", MySqlDbType.Blob).Value = photoData;
    //                cmd.Parameters.Add("@signatureData", MySqlDbType.Blob).Value = signatureData;
    //                int affectedRows = cmd.ExecuteNonQuery();

    //                if (affectedRows > 0)
    //                {
    //                    return Ok("Images uploaded successfully.");
    //                }
    //                else
    //                {
    //                    return StatusCode(500, "Failed to upload images.");
    //                }
    //            }
    //        }
    //    }
    //    catch (Exception ex)
    //    {
    //        return StatusCode(500, "Failed to upload images.");
    //    }
    //}


}

