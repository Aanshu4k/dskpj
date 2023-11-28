import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

const Address = () => {
  const [isSame, setIsSame] = useState(false);
  const [floorData, setFloorData] = useState([]);
  var [addressFields, setAddressFields] = useState({
    hNo: "",
    floor: "",
    buildName: "",
    street: "",
    area: "",
    landmarkDetails: "",
    cityPostalCode: "",
    nearLoc: "",
    division: "",
    landmarkIndicate: ""
  }, []);
  var [supplyAddressFields, setSupplyAddressFields] = useState({
    hNo: "",
    floor: "",
    buildName: "",
    street: "",
    area: "",
    landmarkDetails: "",
    cityPostalCode: "",
    nearLoc: "",
    division: "",
    landmarkIndicate: ""
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5228/api/Address/Get_floor_mst');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setFloorData(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []); // The empty dependency array ensures that useEffect runs only once on component mount

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5228/api/Address/PostAddressDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addressFields),
      });

      if (response.ok) {
        alert('User Address Details Saved Successfully');
      } else {
        console.error('Error saving information');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    try {
      const response = await fetch('http://localhost:5228/api/Address/PostSupplyAddressDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(supplyAddressFields),
      });

      if (response.ok) {
        alert('User Address Details Saved Successfully');
      } else {
        console.error('Error saving information');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    setIsSame(!isSame);
  };
  const handleInputChange2 = (e) => {
    const { name, value } = e.target;
    setSupplyAddressFields({ ...supplyAddressFields, [name]: value });
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAddressFields({ ...addressFields, [name]: value });

  };
  return (
    <Form>
      <Card.Title className="title">ADDRESS</Card.Title>
      <Row className="mb-3">
        <div>
          <strong>For Communication</strong>
        </div>
        <br />
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>House No./Property No.</Form.Label>
          <Form.Control
            name="hNo"
            required
            type="text"
            value={addressFields.hNo}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Floor</Form.Label>
          <br />
          <select
            name="floor"
            style={{ width: "50%" }}
            value={addressFields.floor}
            onChange={handleInputChange}
          >
            {floorData.map((floorData) => (
              <option key={floorData.floor_id} value={floorData.floor}>
                {floorData.floor}
              </option>
            ))}
          </select>
        </Form.Group>
        <Form.Group as={Col} md="3">
          <Form.Label>Building Name</Form.Label>
          <Form.Control name='buildName' required type="text" value={addressFields.buildName} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group as={Col} md="4">
          <Form.Label>Street</Form.Label>
          <Form.Control name='street' required type="text" value={addressFields.street} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group as={Col} md="4">
          <Form.Label>Colony Area</Form.Label>
          <Form.Control name='area' required type="text" value={addressFields.area} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group as={Col} md="3">
          <Form.Label>Landmark Details</Form.Label>
          <Form.Control name='landmarkDetails' required type="text" value={addressFields.landmarkDetails} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group as={Col} md="4">
          <Form.Label>City Postal Code</Form.Label>
          <Form.Control name='cityPostalCode' required type="text" value={addressFields.cityPostalCode} onChange={handleInputChange} />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <div className="communication-header">
          <strong>WHERE SUPPLY IS REQUIRED</strong>
        </div>
        <Form.Group as={Col} md="4">
          <Form.Label required>Nearby Locality</Form.Label>
          <Form.Control
            required
            name='nearLoc'
            type="text"
            placeholder="Type your locality name here"
            value={addressFields.nearLoc}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group as={Col} md="4">
          <Form.Label>Division</Form.Label>
          <Form.Control name='division' type="text" placeholder="" value={addressFields.division} onChange={handleInputChange} />
        </Form.Group>
      </Row>
      <label>
        <input
          className="communication-header"
          onChange={handleChange}
          type="checkbox"
          value="1"
          checked={isSame}
        />{" "}
        Is supply address same as communication address?
      </label>
      {!isSame && (
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>House No./Property No.</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder=""
              disabled={isSame}
              name="hNo"
              value={supplyAddressFields.hNo}
              onChange={handleInputChange2}
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Floor</Form.Label>
            <br />
            <select name="floor" value={supplyAddressFields.floor} onChange={handleInputChange2} style={{ width: "50%" }} disabled={isSame}>
              <option value="Ground">Ground</option>
              <option value="Basement">Basement</option>
              <option value="Floor 1">Floor 1</option>
              <option value="Floor 2">Floor 2</option>
              <option value="Floor 3">Floor 3</option>
              <option value="Floor 4">Floor 4</option>
            </select>
          </Form.Group>
          <Form.Group as={Col} md="3">
            <Form.Label>Building Name</Form.Label>
            <Form.Control
              required
              type="text"
              name='buildName'
              placeholder=""
              value={supplyAddressFields.buildName}
              onChange={handleInputChange2}
              disabled={isSame}
            />
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Form.Label>Street</Form.Label>
            <Form.Control
              required
              type="text"
              name='street'
              value={supplyAddressFields.street}
              onChange={handleInputChange2}
              placeholder=""
              disabled={isSame}
            />
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Form.Label>Colony Area</Form.Label>
            <Form.Control
              required
              type="text"
              name='area'
              value={supplyAddressFields.area}
              onChange={handleInputChange2}
              placeholder=""
              disabled={isSame}
            />
          </Form.Group>
          <Form.Group as={Col} md="3">
            <Form.Label>Landmark Details</Form.Label>
            <Form.Control
              required
              type="text"
              name='landmarkDetails'
              value={supplyAddressFields.landmarkDetails}
              onChange={handleInputChange2}
              placeholder=""
              disabled={isSame}
            />
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Form.Label>City Postal Code</Form.Label>
            <Form.Control
              required
              type="text"
              name='cityPostalCode'
              value={supplyAddressFields.cityPostalCode}
              onChange={handleInputChange2}
              placeholder=""
              disabled={isSame}
            />
          </Form.Group>
        </Row>
      )}

      <div className="communication-header">
        <strong>INDICATE LANDMARKS</strong>
      </div>
      <Form.Group as={Col} md="4">
        <Form.Label>Pole No./Feeder Pillar No./Nearest House No.</Form.Label>
        <Form.Control name='landmarkIndicate' type="text" placeholder="" value={addressFields.landmarkIndicate} onChange={handleInputChange} />
      </Form.Group>
      <Form.Group as={Col} md='4'>
        <button type="submit" className='submit-btn' onClick={handleSubmit} style={{ border: 'solid #ddd 2px', borderRadius: '50px', boxShadow: '0 0 5px rgb(0, 0, 0)', backgroundColor: 'red', color: 'white', width: '20%' }}><b>SUBMIT</b></button>
        <br />
      </Form.Group>
    </Form>

  );
};

export default Address;
