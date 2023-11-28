
import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
const ConnectionDetails = () => {
    const [userChoice, setUserChoice] = useState('');
    const [userOpt, setUserOpt] = useState('');
    const [connData, setConnData] = useState({
        type: 'Permanent',
        UsageCat: '',
        Load_KVA: '',
        Load_KW: '',
        purpose: '',
        AreaType: '',
        PremisesType: '',
        BuildingType: '',
        UPIC_check: '',
        UPIC_num: '',
        FromDate: '',
        ToDate: '',
    }, []);

    const handleChoiceChange = (e) => {
        setUserOpt(e.target.value);
        connData.type = userOpt;
    };
    const handleUPICchange = (e) => {
        setUserChoice(e.target.value);
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'Load_KVA') {
            const loadKVA = parseFloat(value);
            const loadKW = isNaN(loadKVA) ? '' : (0.93 * loadKVA).toFixed(2);
            setConnData({ ...connData, Load_KVA: value, Load_KW: loadKW });
        } else {
            setConnData({ ...connData, [name]: value });
        }
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:5228/api/ConnectionDetails/PostConnectionDetails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(connData),
            });

            if (response.ok) {
                alert('User Connection Details Saved Successfully');
            } else {
                console.error('Error saving information');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Card.Title className='title'>Connection Details</Card.Title>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-around', width: '14rem' }}>
                        <input
                            type="radio"
                            value="Permanent"
                            name="type"
                            checked={connData.type === 'Permanent'}
                            onChange={handleInputChange}
                        />
                        Permanent
                        <input
                            type="radio"
                            value="Temporary"
                            name="type"
                            checked={connData.type === 'Temporary'}
                            onChange={handleInputChange}
                        />
                        Temporary
                    </div>
                    {connData.type === 'Temporary' && (
                        <div>
                            <Form.Group as={Col} md="4">
                                <Form.Label>From Date<span>*</span></Form.Label>
                                <input type="date" name='FromDate' value={connData.FromDate} onChange={handleInputChange} required />
                                <Form.Label>To Date<span>*</span></Form.Label>
                                <input type="date" name='ToDate' value={connData.ToDate} onChange={handleInputChange} required />
                            </Form.Group>
                        </div>
                    )}
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                        <Form.Label>Category of electricity usage <span>*</span></Form.Label>
                        <br />
                        <select class="Category of electricity usage" name='UsageCat' value={connData.UsageCat} onChange={handleInputChange}>
                            <option value="">-Select-</option>
                            <option value="0100">Domestic</option>
                            <option value="0290">Non Domestic</option>
                            <option value="0320">Industrial</option>
                            <option value="0250">Agriculture</option>
                            <option value="0280">Mushrooms</option>
                            <option value="0600">Public Utility</option>
                            <option value="0700">Charging Station e-Vehicles</option>
                            <option value="0800">DJB</option>
                            <option value="0900">DIAL</option>
                            <option value="0910">DMRC</option>
                            <option value="0920">Railway Traction</option>
                            <option value="0930">Advertising</option>
                        </select>
                    </Form.Group>
                    <div style={{ display: 'flex' }}>
                        <Form.Group as={Col} md="4" >
                            <Form.Label>Load (KVA) (1 KVA = 0.93 KW)<span>*</span></Form.Label>
                            <Form.Control required type="text" name='Load_KVA' value={connData.Load_KVA} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group as={Col} md="4" >
                            <Form.Label>Load (KW) <span>*</span></Form.Label>
                            <Form.Control disabled required type="text" name='Load_KW' value={connData.Load_KW} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group as={Col} md="4" >
                            <Form.Label>Purpose of Supply</Form.Label>
                            <Form.Control required type="text" name='purpose' value={connData.purpose} onChange={handleInputChange} />
                        </Form.Group></div>
                    <div style={{ display: 'flex' }}>
                        <Form.Group as={Col} md="4" >
                            <Form.Label>Type of Area<span>*</span></Form.Label><br />
                            <select class="Category of electricity usage" name='AreaType' value={connData.AreaType} onChange={handleInputChange}>
                                <option value="">-Select-</option>
                                <option value="1">-JJ Clusters-</option>
                                <option value="2">Others</option>
                            </select>
                        </Form.Group>
                        <Form.Group as={Col} md="4" >
                            <Form.Label>Type of Premises<span>*</span> </Form.Label><br />
                            <select name='PremisesType' value={connData.PremisesType} onChange={handleInputChange}>
                                <option value="">-Select-</option>
                                <option value="1">-JJ Clusters-</option>
                                <option value="2">Others</option>
                            </select>
                        </Form.Group>
                        <Form.Group as={Col} md="4" >
                            <Form.Label>Type of Use/Building <span>*</span> </Form.Label><br />
                            <select name='BuildingType' value={connData.BuildingType} onChange={handleInputChange} >
                                <option value="">-Select-</option>
                                <option value="1">-Residential Building-</option>
                                <option value="2">Hotel/Guest House</option>
                                <option value="3">Instiutional Building</option>
                                <option value="4">Business building</option>
                                <option value="5">Others</option>
                            </select>
                        </Form.Group>
                    </div><br />
                    <div>
                        <Form.Group as={Col} md="4">
                            <Form.Label>Unique Property Identification Code (UPIC) available? (A 15 digit alphanumeric code issued by MCD)</Form.Label>
                            <br />
                            <div className='UPIC-div'>
                                <input
                                    type="radio"
                                    name='UPIC_check' value='yes' onChange={handleUPICchange}
                                />
                                Yes
                                <input
                                    type="radio"
                                    name='UPIC_check' value='no' onChange={handleUPICchange}
                                />
                                No
                            </div>
                        </Form.Group>
                        {userChoice === 'yes' && (
                            <Form.Group md="4">
                                <Form.Label>UPIC No.<span>*</span></Form.Label><br />
                                <input type="text" name='UPIC_num' value={connData.UPIC_num} onChange={handleInputChange} placeholder="Enter EPIC No" />
                            </Form.Group>
                        )}
                    </div>
                </div>
            </Form>
            <Button type='submit' onClick={handleSubmit}>Submit</Button>
        </>
    );
};

export default ConnectionDetails;