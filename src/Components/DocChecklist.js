import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './DocChecklist.css';
import { useState } from 'react';
const DocChecklist = () => {
    const [radio1, setRadio1] = useState('yes');
    const [radio2, setRadio2] = useState('');
    const [radio3, setRadio3] = useState('');
    const [radio4, setRadio4] = useState('');
    const handleChangeRadio1 = (e) => {
        setRadio1(e.target.value)
    }
    const handleChangeRadio2 = (e) => {
        setRadio2(e.target.value)
    }
    const handleChangeRadio3 = (e) => {
        setRadio3(e.target.value)
    }
    const handleChangeRadio4 = (e) => {
        setRadio4(e.target.value)
    }
    return (
        <Card className='Container' style={{ margin: '10px', padding: '20px' }}>
            <Card.Title className='title'>DOCUMENT CHECKLIST</Card.Title>
            <Card.Body>
                <Container>
                    <Row>
                        <Col xs={6} md={4}>
                            <li><strong>Internal Wiring</strong> at the premises has been tested by a Licensed Electrical Contractor/designated officer of the Government and the test Certificate is available with the applicant.
                                <br />**Wiring test certificate shall be verified during inspection.</li>
                        </Col>
                        <Col xs={6} md={4}>
                            <input type="radio" aria-label="radio 1" name='radio1' onChange={handleChangeRadio1} value='yes' />Yes {"    "}
                            <input type="radio" aria-label="radio 2" name='radio1' onChange={handleChangeRadio1} value='no' />No<br />
                        </Col>
                        {radio1 === 'yes' && (
                            <Col xs={6} md={4}>
                                <input type='file' /><br />
                                Upload photo of Installation Test Report
                            </Col>
                        )}
                        {radio1 === 'no' && (
                            <Col xs={6} md={4}>
                                <p style={{ backgroundColor: 'yellow', color: 'red', padding: '10px' }}>For all permanent connection request, structure and wiring at applied premises should be completed and duly tested by Licensed Electrical Contractor.</p>
                            </Col>
                        )}
                    </Row>
                    <Row>
                        <Col xs={6} md={4}>
                            <li>Do you have lift installed?</li>
                        </Col>
                        <Col xs={6} md={4}>
                            <input type="radio" name='radio2' value='yes' onChange={handleChangeRadio2} />Yes {"    "}
                            <input type="radio" name='radio2' value='no' onChange={handleChangeRadio2} />No<br />
                        </Col>
                    </Row>
                    {radio2 === 'yes' && (
                        <Row>
                            <Col xs={6} md={4}>
                                <li>Lift is installed in premises and the applicant has obtained the Lift Fitness Certificate from the Electrical Inspector for the lift in the said premises and the same is available with the applicant.</li>
                            </Col>
                            <Col xs={6} md={4}>
                                <input type="radio" value='yes' aria-label="radio 1" name='radio3' onChange={handleChangeRadio3} />Yes {"    "}
                                <input type="radio" value='no' aria-label="radio 2" name='radio3' onChange={handleChangeRadio3} />No<br />
                            </Col>
                            {radio3 === 'yes' && (
                                <Col xs={6} md={4}>
                                    <input type='file' /><br />
                                    Upload valid Lift Fitness Certificate
                                </Col>
                            )}
                            {radio3 === 'no' && (
                                <Col xs={6} md={4}>
                                    <p style={{ color: 'red', backgroundColor: 'yellow' }}>Valid Lift license is mandatory to process the request</p>
                                </Col>
                            )}
                        </Row>
                    )}
                    <Row>
                        <Col xs={6} md={4}>
                            <li>Do you want to avail <strong>e-Bill Services(paperless)</strong> on email?</li>
                        </Col>
                        <Col xs={6} md={4}>
                            <input type="radio" aria-label="radio 1" name='radio4' value='yes' onChange={handleChangeRadio4} />Yes {"    "}
                            <input type="radio" aria-label="radio 2" name='radio4' value='no' onChange={handleChangeRadio4} />No<br />
                        </Col>
                        {radio4 === 'yes'&&(
                        <Col xs={6} md={4}>
                            <label>Enter your Email Id</label><span>*</span><br />
                            <input placeholder='Enter your Email Id' type='text' /><br />
                        </Col>
                        )}
                    </Row>
                    <Row>
                        <Col xs={6} md={4}>
                            <li>Do you want to purchase your own CEA approved meter having additional features as approved by Commission</li>
                        </Col>
                        <Col xs={6} md={4}>
                            <input type="radio" aria-label="radio 1" name='radio' />Yes {"    "}
                            <input type="radio" aria-label="radio 2" name='radio' />No<br />
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    );
}
export default DocChecklist;