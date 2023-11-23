import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import './User_Details.css';
import Address from './Address';
import ConnectionDetails from './ConnectionDetails';
import SelfDeclaration from './SelfDeclaration';
import ImpDocs from './ImportantDocs';
import DocChecklist from './DocChecklist';
import Card from 'react-bootstrap/Card';
const User_Details = () => {

    const entrydate = () => {
        const date = new Date();
        const entryDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        return `${entryDate}`;
    }
    const generateUUID = () => {
        const timestamp = new Date().getTime();
        const uniqueString = `${timestamp}_${Math.floor(Math.random() * 1000000)}`;
        return uniqueString;
    };
    const [formData, setFormData] = useState({
        uuid: generateUUID(),
        RequestNo: '',
        ConsumerType: '1',
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
        name: '',
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
    const [CType, setCType] = useState(['']);
    const [selection, setSelection] = useState('1')
    const [RNo, setRNo] = useState('');
    const [titleData, setTitleData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5228/api/NewConnection/Get_Ctype_mst')
            .then(response => response.json())
            .then((data) => {
                console.log('Data received:', data);
                setCType(data);
            })
            .catch((error) => console.error('Error fetching data:', error));

        fetch('http://localhost:5228/api/NewConnection/GetRNo')
            .then(response => response.json())
            .then((data) => {
                console.log('Data received:', data);
                setRNo(data);
            })
            .catch((error) => console.error('Error fetching data:', error));

        const fetchtitleData = async () => {
            try {
                const response = await fetch('http://localhost:5228/api/NewConnection/Get_title_mst');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const titleData = await response.json();
                setTitleData(titleData);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchtitleData();
    }, []);
    const handleSaveDraft = async (event) => {
        event.preventDefault();
        const draftData = { RequestNo: formData.RequestNo, uuid: formData.uuid, ...formData };
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
        if (name === 'ConsumerType') {
            setSelection(value);
        }
        setFormData({ ...formData, [name]: value });
        validateInput();
    };
    const validateInput = () => {
        const { name, FHname, GSTNo, PANNo } = formData;
        const newErrors = {
            name: '', FHname: '', GSTNo: '', PANNo: ''
        }
        const nameRegex = /^[A-Za-z\s]+$/;
        const FHnameRegex = /^[A-Za-z\s]+$/;
        const gstRegex = /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d[Z]{1}[A-Z\d]{1}$/;
        const panRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
        let isValid = true;
        if (selection === '1') {
            if (!nameRegex.test(name)) {
                newErrors.name = 'Entered Name is invalid';
                isValid = false;
            }
            if (!FHnameRegex.test(FHname)) {
                newErrors.FHname = 'Entered Name is invalid';
                isValid = false;
            }
        }
        if (selection === '2') {
            if (!gstRegex.test(GSTNo)) {
                newErrors.GSTNo = 'GST number is invalid';
                isValid = false;
            }
            if (!panRegex.test(PANNo)) {
                newErrors.PANNo = 'PAN number is invalid';
                isValid = false;
            }
        }
        setErrors(newErrors);
        return isValid;
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateInput()) {
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
        }
        else {
            console.log('Form is not valid. Please fix errors.');
            alert('Invalid Input Entered  ')
        }
    };

    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto" style={{ alignItems: 'left' }}>
                            <b>Apply Online / New Connection / Request No:{"  "}{RNo.rNum}</b>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br />
            <div style={{ border: "2px solid #ccc", padding: '10px 10px 20px 10px' }}>
                <div className='UserDetails_div' >
                    <Card.Title className='title'>CONSUMER INFORMATION</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <div className="mb-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <Form.Group className="mb-3" >
                                    <label>
                                        Consumer Type<span>*</span>
                                        <Form.Select
                                            name="ConsumerType"
                                            value={formData.ConsumerType}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            {CType.map((item, index) => (
                                                <option key={index} value={item.ct_id}>{item.consumerType}</option>
                                            ))}
                                        </Form.Select>
                                    </label>
                                    <br />
                                    {
                                        selection === '1' && (
                                            <>
                                                <label>
                                                    Title<span>*</span>
                                                    <Form.Select
                                                        name="title"
                                                        value={formData.title}
                                                        onChange={handleInputChange}
                                                        required
                                                    >
                                                        {titleData.map((tData) => (
                                                            <option key={tData.title_id} value={tData.title}>{tData.title}</option>
                                                        ))}
                                                    </Form.Select>
                                                </label>
                                                <br />
                                                <Form.Label>Name<span>*</span></Form.Label>
                                                <Form.Group style={{ display: 'flex', flexDirection: 'column', width: '150%' }}>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Name"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                    <span style={{ color: 'red' }}>{errors.name}</span>
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
                                                    <span style={{ color: 'red' }}>{errors.FHname}</span>
                                                </Form.Group>

                                            </>
                                        )}
                                    {selection === '2' && (
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
                                                /><br />
                                                <Form.Label>GST No.<span>*</span></Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="GSTNo"
                                                    value={formData.GSTNo}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                                <span style={{ color: 'red' }}>{errors.GSTNo}</span><br /><br />
                                                <Form.Label>PAN No.<span>*</span></Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="PANNo"
                                                    value={formData.PANNo}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                                <span style={{ color: 'red' }}>{errors.PANNo}</span>
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
                                                <input class="custom-file-input" type="file" style={{ marginRight: '45%', marginTop: '-66%' }} /><br />Upload File
                                                <label>Allows only jpg/png files up to 100kb size.</label>

                                            </div><br />
                                            <div style={{ width: "auto" }}>
                                                <img alt='ok' src="\signature.png" style={{ height: "100%", width: "50%", border: "1px solid grey" }} />
                                                <input type="file" style={{ marginRight: '45%', marginTop: '-66%' }} /><br />Upload File
                                                <label for='upload'>Allows only jpg/png files up to 50kb size.</label>
                                            </div>
                                        </div>
                                    </Form>
                                </Form.Group></div>
                        </div>
                        <button type="submit" className='Save-btn' onClick={handleSaveDraft} style={{ border: 'solid #ddd 2px', borderRadius: '50px', boxShadow: '0 0 5px rgb(0, 0, 0)', backgroundColor: 'yellow', color: 'black', width: '20%' }}><b>Save as Draft</b></button>
                        {' '}
                        <button type="submit" className='submit-btn' onClick={handleSubmit} style={{ border: 'solid #ddd 2px', borderRadius: '50px', boxShadow: '0 0 5px rgb(0, 0, 0)', backgroundColor: 'red', color: 'white', width: '20%' }}><b>SUBMIT</b></button>
                        <br />
                        {/* File Uploads */}
                        <br />
                    </Form>
                </div><br />
                <div className='Address-div'>
                    <Address />
                </div><br />
                <div className='ConnectionDetails-div'>
                    <ConnectionDetails />
                </div>
                <div className='selfdecl-div'>
                    <SelfDeclaration name={formData.name} salutation={formData.salutation} fhname={formData.FHname} />
                </div>
                <ImpDocs /><br />
                <DocChecklist />
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











