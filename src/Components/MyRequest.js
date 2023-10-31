import React, { useState, useEffect } from 'react';

const MyRequest = () => {
    const [items, setItems] = useState({
        Company:'',
        District:'',
        RequestType:'New Connection',
        Email:'',
        MobileNo:'',
        EntryDate:'2023-10-31',
    },[]);

    useEffect(() => {
        console.log("API");
        fetch('http://localhost:5228/api/NewConnection/GetMyRequest')
            .then((response) => response.json())
            .then((data) => {
                console.log('Data received:', data);
                setItems(data);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const tableStyle = {
        borderCollapse: 'collapse',
        width: '100%',
        backgroundColor: '#FFE7E7',
    };

    const thStyle = {
        border: '1px solid grey',
        padding: '8px',
        textAlign: 'left',
        backgroundColor: '#FFA2A2',
    };

    const tdStyle = {
        border: '1px solid grey',
        padding: '8px',
        textAlign: 'left',
    };

    const isDataAvailable = Array.isArray(items) && items.length > 0;

    return (
        <div>
            <h3>Consumer Requests</h3>
            {isDataAvailable ? (
                <table style={tableStyle}>
                    <thead style={thStyle}>
                        <tr>
                            <th>Request No</th>
                            <th>Company</th>
                            <th>District</th>
                            <th>Request Type</th>
                            <th>Name</th>
                            <th>Email Id</th>
                            <th>Mobile No</th>
                            <th>Entry Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((user, index) => (
                            <tr key={index}>
                                <td style={tdStyle}>{user.requestNo}</td>
                                <td style={tdStyle}>{user.Company}</td>
                                <td style={tdStyle}>{user.District}</td>
                                <td style={tdStyle}>{user.RequestType}</td>
                                <td style={tdStyle}>{user.name}</td>
                                <td style={tdStyle}>{user.Email}</td>
                                <td style={tdStyle}>{user.MobileNo}</td>
                                <td style={tdStyle}>{user.EntryDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
};

export default MyRequest;
