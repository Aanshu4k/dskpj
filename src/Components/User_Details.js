import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import './User_Details.css';
const User_Details = () => {
    const generateUniqueRequestNumber = () => {
        const date = new Date();
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getFullYear()}`;
        const randomDigits = Math.floor(1000 + Math.random() * 1000);
        return `R${formattedDate}${randomDigits}`;
    };
    const entrydate = () => {
        const date = new Date();
        const entryDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        return `${entryDate}`;
    }
    
    const [formData, setFormData] = useState({
        RequestNo: generateUniqueRequestNumber(),
        ConsumerType: 'individual',
        title: '',
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
        EntryDate: entrydate(),
    }, []);
    const [errors, setErrors] = useState({
        title: '',
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
        EntryDate: entrydate(),
    }, []);
    const [CType, setCType] = useState({
        ConsumerType:'', Ct_id:'',
    },[]);
    useEffect(() => {
        fetch('http://localhost:5228/api/NewConnection/Get_Ctype_mst')
          .then(response => response.json())
          .then((data) => {
            console.log('Data received:', data);
            setCType(data);
        })
        .catch((error) => console.error('Error fetching data:', error));
      }, []); 

    const validateInput = () => {
        const regexName = /^[A-Za-z\s]+$/;
        const regexFHname = /^[A-Za-z\s]+$/;
        const newErrors = { ...errors };
        if ((formData.name || formData.FHname) && (!regexName.test(formData.name) || !regexFHname.test(formData.FHname))) {
            newErrors.name = 'Please enter a valid name';
            newErrors.FHname = 'Please enter a valid name';
        } else {
            newErrors.name = '';
            newErrors.FHname = '';
        }
        setErrors(newErrors);
    };


    const handleSaveDraft = () => {
        const draftData = { RequestNo: formData.RequestNo, ...formData };
        fetch('http://localhost:5228/api/NewConnection/SaveDraft', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(draftData),
        })
            .then((response) => {
                if (response.ok) {
                    alert('Draft saved successfully');
                } else {
                    console.error('Error saving Draft');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        validateInput();  
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
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
            <br />
            <div style={{ border: "2px solid #ccc", padding: '0px 0px 20px 20px' }}>
                <h3 style={{ textAlign: 'center', padding: "20px", backgroundColor: 'rgb(194, 209, 240) hsl(220, 61%, 85%)' }}><b><u>Consumer Information</u></b></h3>
                <Form onSubmit={handleSubmit}>
                    <div className="mb-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <Form.Group className="mb-3" style={{}}>
                                <label>
                                    Consumer Type<span>*</span>
                                    <Form.Select
                                        name="ConsumerType"
                                        value={formData.ConsumerType}
                                        onChange={handleInputChange}
                                        required
                                    >

                                        <option value={CType.Ct_id}>{CType.ConsumerType}</option>
                                        <option value={CType.Ct_id}>{CType.ConsumerType}</option>
                                    </Form.Select>
                                </label>
                                <br />
                                {CType.Ct_id=== 1 && (
                                    <>
                                        <label>
                                            Title<span>*</span>
                                            <Form.Select
                                                name="title"
                                                value={formData.title}
                                                onChange={handleInputChange}
                                                required
                                            >
                                                <option value="select">Select</option>
                                                <option value="Mr.">Mr.</option>
                                                <option value="Mrs.">Mrs.</option>
                                                <option value="other">Other</option>
                                            </Form.Select>
                                        </label>
                                        <br />
                                        <Form.Label>Name<span>*</span></Form.Label>
                                        <Form.Group style={{display:'flex',flexDirection:'column', width: '150%' }}>
                                            <Form.Control
                                                type="text"
                                                placeholder="Name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
                                            <Form.Label></Form.Label>
                                        </Form.Group>
                                        <br />
                                        <Form.Group style={{ display: 'flex', justifyContent: 'space-between', width: 'auto' }}>
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
                                            <Form.Label>Father/Husband's Name<span>*</span></Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="FHname"
                                                value={formData.FHname}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            {errors.FHname && <span style={{ color: 'red' }}>{errors.FHname}</span>}
                                        </Form.Group>

                                    </>
                                )}
                                {CType.Ct_id === 2 && (
                                    <div style={{}}>
                                        <br />
                                        <Form.Group>
                                            <Form.Label>Firm/Trust/Company/Others Name<span>*</span></Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="FirmName"
                                                value={formData.FirmName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <Form.Label>Name of Authorized Signatory<span>*</span></Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="Authorname"
                                                value={formData.Authorname}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <Form.Label>Designation of Signatory<span>*</span></Form.Label>
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
                                            <Form.Label>GST No.<span>*</span></Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="GSTNo"
                                                value={formData.GSTNo}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <Form.Label>PAN No.<span>*</span></Form.Label>
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
                        <div>
                            <Form.Group>
                                <Form >
                                    <div style={{ display: 'block' }}>
                                        <div style={{ width: "auto" }}>
                                            <img alt='ok' src="\photo_logo.png" style={{ height: "200px", border: "1px solid grey" }} />
                                            <input type="file" style={{ marginRight: '45%', marginTop: '-66%' }} />Upload File
                                            <p>Allows only jpg/png files up to 100kb size.</p>
                                        </div><br />
                                        <div style={{ width: "auto" }}>
                                            <img alt='ok' src="\signature.png" style={{ height: "100%", width: "50%", border: "1px solid grey" }} />
                                            <input type="file" style={{ marginRight: '45%', marginTop: '-66%' }} />Upload File
                                            <p>Allows only jpg/png files up to 50kb size.</p>
                                        </div>
                                    </div>
                                </Form>
                            </Form.Group></div>
                    </div>
                    <button type="submit" onClick={handleSaveDraft} style={{ backgroundColor: 'yellow', color: 'black', width: '20%' }}><b>Save as Draft</b></button>
                    <button type="submit" onClick={handleSubmit} style={{ backgroundColor: 'red', color: 'white', width: '20%' }}><b>SUBMIT</b></button>
                    <br />

                    {/* File Uploads */}

                </Form>
            </div>
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











