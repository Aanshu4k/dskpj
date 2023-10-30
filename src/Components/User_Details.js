import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import MyRequest from "./MyRequest";
const User_Details = () => {
    const generateUniqueRequestNumber = () => {
        const date = new Date();
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getFullYear()}`;
        const randomDigits = Math.floor(1000 + Math.random() * 1000);
        return `R${formattedDate}${randomDigits}`;
    };
    const [formData, setFormData] = useState({
        RequestNo: generateUniqueRequestNumber(),
        ConsumerType: 'individual',
        title: 'Mr.',
        name: '',
        salutation: '',
        FHname: '',
        FirmName: '',
        Authorname: '',
        DesigOfSig: '',
        OrgType: '',
        IncorpDate: '',
        GSTNo: '',
        PANNo: '',
        ImageData: 'null',
        SignatureData: 'null',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Submitting the form data
        try {
            const response = await fetch("http://localhost:5228/api/NewConnection", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Data submitted successfully');
                console.log('Data submitted successfully');
            } else {
                console.error('Error submitting data. Response Status: ' + response.status);
                const responseText = await response.text();
                console.error('Error Message: ' + responseText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (

        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto" style={{ alignItems: 'left' }}>
                            <b>Apply Online / New Connection / Request No: {formData.RequestNo}</b>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <h3>Consumer Information</h3>
            <Form onSubmit={handleSubmit}>
                <div className="mb-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <Form.Group className="mb-3" style={{}}>
                            <label>
                                Consumer Type
                                <Form.Select
                                    name="ConsumerType"
                                    value={formData.ConsumerType}
                                    onChange={handleInputChange}
                                    required
                                >

                                    <option value="individual">Individual</option>
                                    <option value="firm">Firm/Trust/Company/Others</option>
                                </Form.Select>
                            </label>
                            <br />
                            {formData.ConsumerType === 'individual' && (
                                <>
                                    <label>
                                        Title
                                        <Form.Select
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="Mr.">Mr.</option>
                                            <option value="Mrs.">Mrs.</option>
                                            <option value="other">Other</option>
                                        </Form.Select>
                                    </label>
                                    <br />
                                    <Form.Label>Name</Form.Label>
                                    <Form.Group style={{ display: 'flex', width: '50em' }}>
                                        <Form.Control
                                            type="text"
                                            placeholder="Name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <Form.Label>&nbsp;</Form.Label>
                                    </Form.Group>
                                    <br />
                                    <Form.Group style={{ display: 'flex', justifyContent: 'space-between', width: '60%' }}>
                                        <label>
                                            <input
                                                type="radio"
                                                name="salutation"
                                                value="Son of"
                                                checked={formData.salutation === 'Son of'}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            Son Of
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                value="Daughter of"
                                                checked={formData.salutation === 'Daughter of'}
                                                name="salutation"
                                                onChange={handleInputChange}
                                                required
                                            />
                                            Daughter Of
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="salutation"
                                                value="Wife of"
                                                checked={formData.salutation === 'Wife of'}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            Wife Of
                                        </label>
                                    </Form.Group>
                                    <br />
                                    <Form.Group>
                                        <Form.Label>Father/Husband's Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="FHname"
                                            value={formData.FHname}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>
                                    
                                </>
                            )}
                            {formData.ConsumerType === 'firm' && (
                                <div style={{}}>
                                    <br />
                                    <Form.Group>
                                        <Form.Label>Firm/Trust/Company/Others Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="FirmName"
                                            value={formData.FirmName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <Form.Label>Name of Authorized Signatory</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="Authorname"
                                            value={formData.Authorname}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <Form.Label>Designation of Signatory</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="DesigOfSig"
                                            value={formData.DesigOfSig}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <Form.Label>Type of Organization</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="OrgType"
                                            value={formData.OrgType}
                                            onChange={handleInputChange}
                                            required
                                        /><Form.Label>Date of Incorporation</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="IncorpDate"
                                            value={formData.IncorpDate}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <Form.Label>GST No.</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="GSTNo"
                                            value={formData.GSTNo}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <Form.Label>PAN No.</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="PANNo"
                                            value={formData.PANNo}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>
                                </div>
                            )}
                        </Form.Group>
                    </div>
                </div>
                <button type="submit" style={{ backgroundColor: '#FD8D75', color: 'white', width: '30%' }}><b>SUBMIT</b></button>
                <br />
                {/* <Form.Group>
                <Form  onSubmit={handleSubmit2}>
                <div style={{display:'block'}}>
                    <div style={{ width: "auto" }}>
                        <img alt='ok' src="\photo_logo.png" style={{ height: "200px", border: "1px solid grey" }} />
                        <input type="file" onChange={handlePhotoFileChange} style={{ marginRight: '45%', marginTop: '-66%' }} />Upload File
                        <p>Allows only jpg/png files up to 100kb size.</p>
                    </div>
                    <div style={{ width: "auto" }}>
                        <img alt='ok' src="\signature.png" style={{ height: "100%",width:"50%", border: "1px solid grey" }} />
                        <input type="file" onChange={handleSignatureFileChange} style={{ marginRight: '45%', marginTop: '-66%' }} />Upload File
                        <p>Allows only jpg/png files up to 50kb size.</p>
                    </div>
                </div>
                </Form>
                // </Form.Group> */}
                {/* File Uploads */}

            </Form>

        </div >
    );
};

export default User_Details;









{/* 
<Navbar expand="lg" className="bg-body-tertiary">
                    <Container>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto" style={{ alignItems: 'left' }}>
                                <b>Apply Online / New Connection / Request No:
                                    <Form.Group>
                                        <Form.Control
                                            type="text"
                                            value=RequestNo
                                            readOnly
                                        />
                                    </Form.Group>
                                </b>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar> */}
{/* <Form.Group>
                <Form  onSubmit={handleSubmit2}>
                
                <div style={{display:'block'}}>
                    <div style={{ width: "auto" }}>
                        <img alt='ok' src="\photo_logo.png" style={{ height: "200px", border: "1px solid grey" }} />
                        <input type="file" onChange={handlePhotoFileChange} style={{ marginRight: '45%', marginTop: '-66%' }} />Upload File
                        <p>Allows only jpg/png files up to 100kb size.</p>
                    </div>
                    <div style={{ width: "auto" }}>
                        <img alt='ok' src="\signature.png" style={{ height: "100%",width:"50%", border: "1px solid grey" }} />
                        <input type="file" onChange={handleSignatureFileChange} style={{ marginRight: '45%', marginTop: '-66%' }} />Upload File
                        <p>Allows only jpg/png files up to 50kb size.</p>
                    </div>
                </div>
                </Form>
                // </Form.Group> */}











