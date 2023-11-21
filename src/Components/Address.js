import './Address.css';
import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
const Address = () => {
    const [isSame, setIsSame] = useState(false);
    var [addressFields, setAddressFields] = useState(
        {
            Hno: '', floor: '', bName: '', street: '', area: '', lm: '', lmDetails: '', psCode: ''
        });
    const handleChange = () => {
        setIsSame(!isSame);
    }
    const handleInputChange = (e) => {

    };

    return (
        <Form >
            <Card.Title className='title'>ADDRESS</Card.Title>
            <Row className="mb-3">
                <div ><strong>For Communication</strong></div><br />
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                    <Form.Label>House No./Property No.</Form.Label>
                    <Form.Control required type="text" onChange={handleInputChange} />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                    <Form.Label>Floor</Form.Label><br />
                    <select name="Floor" style={{ width: '50%' }} onChange={handleInputChange} >
                        <option value="option1">Ground</option>
                        <option value="option2">Basement</option>
                        <option value="option3">Floor 1</option>
                        <option value="option4">Floor 2</option>
                        <option value="option5">Floor 3</option>
                        <option value="option6">Floor 4</option>
                    </select>
                </Form.Group>
                <Form.Group as={Col} md="3" >
                    <Form.Label>Building Name</Form.Label>
                    <Form.Control required type="text" />
                </Form.Group>
                <Form.Group as={Col} md="4" >
                    <Form.Label>Street</Form.Label>
                    <Form.Control required type="text" />
                </Form.Group>
                <Form.Group as={Col} md="4" >
                    <Form.Label>Colony Area</Form.Label>
                    <Form.Control required type="text" />
                </Form.Group>
                <Form.Group as={Col} md="3" >
                    <Form.Label>Landmark Details</Form.Label>
                    <Form.Control required type="text" />
                </Form.Group>
                <Form.Group as={Col} md="4" >
                    <Form.Label>City Postal Code</Form.Label>
                    <Form.Control required type="text" />
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <div className='communication-header'><strong>WHERE SUPPLY IS REQUIRED</strong></div>
                <Form.Group as={Col} md="4" >
                    <Form.Label required>Nearby Locality</Form.Label>
                    <Form.Control required type="text" placeholder="Type your locality name here" />
                </Form.Group>
                <Form.Group as={Col} md="4" >
                    <Form.Label>Division</Form.Label>
                    <Form.Control type="text" placeholder="" />
                </Form.Group>
            </Row>

            <label>
                <input class="communication-header" onChange={handleChange} type="checkbox" value="1" checked={isSame} />
                Is supply address same as communication address?
            </label>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom01" >
                    <Form.Label>House No./Property No.</Form.Label>
                    <Form.Control required type="text" placeholder="" disabled={isSame} onChange={handleInputChange}
                        value={isSame ? addressFields.Hno : ''} />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom02" >
                    <Form.Label>Floor</Form.Label><br />
                    <select name="Floor" style={{ width: '50%' }} disabled={isSame} >
                        <option value="option1">Ground</option>
                        <option value="option2">Basement</option>
                        <option value="option3">Floor 1</option>
                        <option value="option4">Floor 2</option>
                        <option value="option5">Floor 3</option>
                        <option value="option6">Floor 4</option>
                    </select>
                </Form.Group>
                <Form.Group as={Col} md="3" >
                    <Form.Label>Building Name</Form.Label>
                    <Form.Control required type="text" placeholder="" disabled={isSame} />
                </Form.Group>
                <Form.Group as={Col} md="4" >
                    <Form.Label>Street</Form.Label>
                    <Form.Control required type="text" placeholder="" disabled={isSame} />
                </Form.Group>
                <Form.Group as={Col} md="4" >
                    <Form.Label>Colony Area</Form.Label>
                    <Form.Control required type="text" placeholder="" disabled={isSame} />
                </Form.Group>
                <Form.Group as={Col} md="3" >
                    <Form.Label>Landmark Details</Form.Label>
                    <Form.Control required type="text" placeholder="" disabled={isSame} />
                </Form.Group>
                <Form.Group as={Col} md="4" >
                    <Form.Label>City Postal Code</Form.Label>
                    <Form.Control required type="text" placeholder="" disabled={isSame} />
                </Form.Group>
            </Row>
            <div className='communication-header'><strong>INDICATE LANDMARKS</strong></div>
            <Form.Group as={Col} md="4" >
                <Form.Label>Pole No./Feeder Pillar No./Nearest House No.</Form.Label>
                <Form.Control type="text" placeholder="" />
            </Form.Group>
        </Form>
    );
}

export default Address;