
import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
const ConnectionDetails = () => {
    // const [userChoice, setUserChoice] = useState('');
    // const [userOpt, setUserOpt] = useState('');
    const [usageCateg, setUsageCateg] = useState([]);
    const [buildingType, setBuildingType] = useState([]);
    const [selection, setSelection] = useState('');
    const [connData, setConnData] = useState({
        type: 'Permanent',
        UsageCat: '',
        Load_KVA: '-',
        Load_KW: '',
        purpose: '',
        AreaType: '',
        PremisesType: '',
        BuildingType: '',
        UPIC_check: '',
        UPIC_num: '',
        FromDate: '-',
        ToDate: '-',
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5228/api/ConnectionDetails/Get_electricityusagecategory_mst');
                if (!response.ok) {
                    throw new Error('Failed to fetch Data');
                }
                const data = await response.json();
                setUsageCateg(data);
            }
            catch (error) {
                console.error('Error:', error);
            }
        };
        const fetchData2 = async () => {
            try {
                const response = await fetch('http://localhost:5228/api/ConnectionDetails/Get_buildingtype_mst');
                if (!response.ok) {
                    throw new Error('Failed to fetch Data');
                }
                const data = await response.json();
                setBuildingType(data);
            }
            catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
        fetchData2();
    }, [])
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'UsageCat') {
            setSelection(value);
            setConnData({ ...connData, [name]: value });
        }
        else if (name === 'Load_KVA') {
            const loadKVA = parseFloat(value);
            const loadKW = isNaN(loadKVA) ? '' : (0.93 * loadKVA).toFixed(2);
            setConnData({ ...connData, Load_KVA: value, Load_KW: loadKW });
        }
        else {
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
                        <Form.Select class="Category of electricity usage" name='UsageCat' value={connData.UsageCat} onChange={handleInputChange}>
                            {usageCateg.map((cat) => (
                                <option key={cat.cat_id} value={cat.category_name}>{cat.category_name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <div style={{ display: 'inline' }}>
                        {selection !== 'Domestic' && (
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Form.Group as={Col} md="4">
                                    <Form.Label>Load (KVA) (1 KVA = 0.93 KW)<span>*</span></Form.Label>
                                    <Form.Control required type="number" name='Load_KVA' value={connData.Load_KVA} onChange={handleInputChange} />
                                </Form.Group>
                                <Form.Group as={Col} md="4">
                                    <Form.Label>Load (KW) <span>*</span></Form.Label><br />
                                    <Form.Control disabled required type="number" name='Load_KW' value={connData.Load_KW} onChange={handleInputChange} />
                                </Form.Group>
                                <Form.Group as={Col} md="4" >
                                    <Form.Label>Purpose of Supply</Form.Label>
                                    <Form.Control required type="text" name='purpose' value={connData.purpose} onChange={handleInputChange} />
                                </Form.Group>
                            </div>
                        )}
                        {selection === 'Domestic' && (
                            <div style={{ display: 'flex' }}>
                                <Form.Group as={Col} md="2">
                                    <Form.Label>Load (KW) <span>*</span></Form.Label>
                                    <Form.Control required type="number" name='Load_KW' value={connData.Load_KW} onChange={handleInputChange} />
                                </Form.Group>{" "}
                                <Form.Group as={Col} md="2" >
                                    <Form.Label>Purpose of Supply</Form.Label>
                                    <Form.Control required type="text" name='purpose' value={connData.purpose} onChange={handleInputChange} />
                                </Form.Group>
                            </div>
                        )}
                    </div>
                    <div style={{ display: 'flex' }}>
                        <Form.Group as={Col} md="4" >
                            <Form.Label>Type of Area<span>*</span></Form.Label><br />
                            <select class="Category of electricity usage" name='AreaType' value={connData.AreaType} onChange={handleInputChange}>
                                <option value="-Select-">-Select-</option>
                                <option value="JJ Clusters">JJ Clusters</option>
                                <option value="Others">Others</option>
                            </select>
                        </Form.Group>
                        <Form.Group as={Col} md="4" >
                            <Form.Label>Type of Premises<span>*</span> </Form.Label><br />
                            <select name='PremisesType' value={connData.PremisesType} onChange={handleInputChange}>
                                <option value="-Select-">-Select-</option>
                                <option value="JJ Clusters">JJ Clusters</option>
                                <option value="Others">Others</option>
                            </select>
                        </Form.Group>
                        <Form.Group as={Col} md="4" >
                            <Form.Label>Type of Use/Building <span>*</span> </Form.Label><br />
                            <select name='BuildingType' value={connData.BuildingType} onChange={handleInputChange} >
                                {buildingType.map((type) => (
                                    <option key={type.id} value={type.name}>{type.name}</option>
                                ))}
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
                                    name='UPIC_check' value='yes' checked={connData.UPIC_check === 'yes'} onChange={handleInputChange}
                                />
                                Yes{" "}
                                <input
                                    type="radio"
                                    name='UPIC_check' value='no' checked={connData.UPIC_check === 'no'} onChange={handleInputChange}
                                />
                                No
                            </div>
                        </Form.Group>
                        {connData.UPIC_check === 'yes' && (
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