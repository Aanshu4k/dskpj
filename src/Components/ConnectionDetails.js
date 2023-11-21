
import React, { useState,useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
const ConnectionDetails = () => {
    const [userChoice, setUserChoice] = useState('');
    const [userOpt, setUserOpt] = useState('');

    const handleChoiceChange = (e) => {
        setUserOpt(e.target.value);
    };
    const handleUPICchange=(e)=>{
        setUserChoice(e.target.value);
    }

    return (
        <Form>
            <div>
                <h4>Connection details</h4>
            </div>

            <div>
                <div style={{ display: 'flex', justifyContent: 'space-around', width: '14rem' }}>
                    <input
                        type="radio"
                        value="1"
                        name="opt1"
                        checked={userOpt === '1'}
                        onChange={handleChoiceChange}
                    />
                    Permanent
                    <input
                        type="radio"
                        value="2"
                        name="opt1"
                        checked={userOpt === '2'}
                        onChange={handleChoiceChange}
                    />
                    Temporary
                </div>
                {userOpt === '2' && (
                    <div>
                        <Form.Group as={Col} md="4">
                            <Form.Label>From Date<span>*</span></Form.Label>
                            <input type="date" required/>
                            <Form.Label>To Date<span>*</span></Form.Label>
                            <input type="date" required/>
                        </Form.Group>
                    </div>
                )}
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                    <Form.Label>Category of electricity usage </Form.Label>
                    <br />
                    <select class="Category of electricity usage" >
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
                        <Form.Label>Load (KVA) (1 KVA = 0.93 KW)</Form.Label>
                        <Form.Control required type="text" placeholder="0" />
                    </Form.Group>
                    <Form.Group as={Col} md="4" >
                        <Form.Label>Load (KW) </Form.Label>
                        <Form.Control required type="text" placeholder="0" />
                    </Form.Group>
                    <Form.Group as={Col} md="4" >
                        <Form.Label>Purpose of Supply</Form.Label>
                        <Form.Control required type="text" placeholder="0" />
                    </Form.Group></div>
                <div style={{ display: 'flex' }}>
                    <Form.Group as={Col} md="4" >
                        <Form.Label>Category of electricity usage </Form.Label><br />
                        <select class="Category of electricity usage" >
                            <option value="">-Select-</option>
                            <option value="1">-JJ Clusters-</option>
                            <option value="2">Others</option>
                        </select>
                    </Form.Group>
                    <Form.Group as={Col} md="4" >
                        <Form.Label>Type of Premises </Form.Label><br />
                        <select  >
                            <option value="">-Select-</option>
                            <option value="1">-JJ Clusters-</option>
                            <option value="2">Others</option>
                        </select>
                    </Form.Group>
                    <Form.Group as={Col} md="4" >
                        <Form.Label>Type of Use/Building  </Form.Label><br />
                        <select  >
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
                                value="1"
                                name="opt"
                                onChange={handleUPICchange}
                            />
                            Yes
                            <input
                                type="radio"
                                value="2"
                                name="opt"
                                onChange={handleUPICchange}
                            />
                            No
                        </div>
                    </Form.Group>
                    {userChoice === '1' && (
                    <Form.Group md="4">
                        <Form.Label>EPIC No</Form.Label>
                        <input type="text" placeholder="Enter EPIC No" />
                    </Form.Group>
                
            )}
                </div>
                
            </div>
        </Form>
    );
};

export default ConnectionDetails;