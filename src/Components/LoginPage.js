import React, { useState } from 'react';

const LoginPage = () => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mobileNumber, email }),
        });

        if (response.status === 200) {

        } else {

        };

        return (
            <div>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Mobile Number"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Password"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }
}

export default LoginPage;
