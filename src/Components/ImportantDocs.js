import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './ImpDocs.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const ImpDocs = () => {
    return (
        <Card className='Container'>
            <Card.Title className='title'>Important Documents</Card.Title>
            <Card.Body>
                <Card.Text>
                    <Container>
                        <p className='p-div'>
                            <h6>Important Note :</h6>
                            <ul>
                                <li class="note-point">
                                    For ownership proof - Sale Deed/Conveyance Deed/Allotment Letter/Valid Lease agreement/Mutation certificate issued by Govt authority/sub division agreement/GPA.
                                </li>
                                <li class="note-point">
                                    Ensure all pages (front and back side) of the relevant document are uploaded.
                                </li>
                                <li class="note-point">
                                    All uploaded documents should be self-attested by applicants(s) on photocopy of original documents.
                                </li>
                                <li class="note-point">

                                    All uploaded documents should be clear &amp; readable.
                                </li>
                                <li class="note-point">
                                    Uploaded documents should be in Pdf format . Ownership proof document within size limit of 25 MB &amp; other documents within size limit of 5 MB .
                                </li>
                            </ul>
                        </p>

                    </Container>
                </Card.Text>
                <Container>
                    <Card.Text><h6 class="font-weight-bold mb-0 ">
                        <li typeof='square'><i></i> Identification Proof (Self Attested)<span style={{ color: '#6c757d ' }}> (Anyone in PDF Format)</span><span class="text-danger">*</span>
                        </li>
                    </h6>
                    </Card.Text>
                    <Row>
                        {/* <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '-15px' }}> */}
                        <Col xs={6} md={4}>
                            <label>ID Proof Type </label><br />
                            <select>
                                <option class="" value="">
                                    -Select-
                                </option>
                                <option class="" value="DL">
                                    Driving License
                                </option>
                                <option class="" value="Election">
                                    Electoral Identity Card
                                </option>
                                <option class="" value="Aadhaar">
                                    Aadhaar Card
                                </option>
                                <option class="" value="Govt Identity Card">
                                    Photo Identity Card Issued By Any Govt. Agency
                                </option>
                                <option class="" value="Passport">
                                    Passport
                                </option>
                                <option class="" value="PAN">
                                    PAN Card
                                </option>
                                <option class="" value="Ration Card">
                                    Ration Card having Photograph
                                </option>
                            </select>
                        </Col>
                        <Col xs={6} md={4}>
                            <label>ID Proof Doc No. </label><span>*</span><br />
                            <input type='text' />
                        </Col>
                        <Col xs={6} md={4}>
                            <input type="file" id='ID-proof-btn' /><br />Upload File
                        </Col>
                    </Row>
                    {/* </div> */}
                </Container>
                <Card.Text>
                    <h6 class="font-weight-bold mb-0 ">
                        <li typeof='square'><i></i> Ownership Proof (Self Attested)<span style={{ color: '#6c757d ' }}> (Anyone in PDF Format)</span><span class="text-danger">*</span>
                        </li>
                    </h6>
                </Card.Text>
                <Container>
                    <Row>
                    <Col>
                        <select >
                            <option class="" value="">
                                -Select-
                            </option>
                            <option class="" value="Sale Deed">
                                Sale Deed
                            </option>
                            <option class="" value="Conveyance Deed">
                                Conveyance Deed
                            </option>
                            <option class="" value="Allotment Letter">
                                Allotment Letter
                            </option>
                            <option class="" value="Valid Lease agreement">
                                Valid Lease agreement
                            </option>
                            <option class="" value="Mutation certificate issued by Govt">
                                Mutation certificate issued by Govt
                            </option>
                            <option class="" value="GPA (Last 5 Years Chain)">
                                GPA (Last 5 Years Chain)
                            </option>
                        </select>
                    </Col>
                    <Col>
                        <input type="file" /><br />Upload File
                    </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    );
}
export default ImpDocs;