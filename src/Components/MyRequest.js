import React, { useState, useEffect } from 'react';

const MyRequest = () => {
    const [items, setItems] = useState([]);
    
    useEffect(() => {
        fetch('http://localhost:5228/api/NewConnection/GetMyRequest')
            .then((response) => response.json())
            .then((data) => {
                console.log('Data received:', data);
                setItems(data.items);
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
        backgroundColor: '#FFA2A2'
    };

    const tdStyle = {
        border: '1px solid grey',
        padding: '8px',
        textAlign: 'left',
    };
    
    return (
        <div>   
            <h3>Consumer Requests</h3>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>Request No</th>
                        <th style={thStyle}>Company</th>
                        <th style={thStyle}>District</th>
                        <th style={thStyle}>Request Type</th>
                        <th style={thStyle}>Name</th>
                        <th style={thStyle}>Email Id</th>
                        <th style={thStyle}>Mobile No</th>
                        <th style={thStyle}>Entry Date</th>
                    </tr>
                </thead>
                <tbody>
                    {items && items.map((user) => (
                        <tr key={user.RequestNo}>
                            <td style={tdStyle}>{user.RequestNo}</td>
                            <td style={tdStyle}>{user.Company}</td>
                            <td style={tdStyle}>{user.District}</td>
                            <td style={tdStyle}>{user.RequestType}</td>
                            <td style={tdStyle}>{user.Name}</td>
                            <td style={tdStyle}>{user.Email}</td>
                            <td style={tdStyle}>{user.MobileNo}</td>
                            <td style={tdStyle}>{user.EntryDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyRequest;
