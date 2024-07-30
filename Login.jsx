import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import petrolImage from '../assets/petrol.png';


const Login = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const storedUserName = localStorage.getItem('userName');
        if (storedUserName) {
            navigate('/home');
        }
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/api/create', {
                userName,
                password,
            });
            localStorage.setItem('userName', userName);
            localStorage.setItem('password', password);
            console.log('login successfully', response);
            alert("Login successfully");
            navigate('/home');
        } catch (error) {
            console.log('login failed', error);
            alert("Failed to login");
            if (error.response) {
                console.log('Response data', error.response.data);
                console.log('Response status', error.response.status);
                console.log('Response header', error.response.header);
                if (error.response.status === 409) {
                    alert("UserName is already exists!! Try another username");
                }
            } else if (error.request) {
                console.log('No response received', error.request);
            } else {
                console.log('Something else');
            }
        }
    };

    return (
        <div className='back'>
       <div className="navbar">
    <div className="navbar-brand">Welcome To Petrol login!! 😊</div>
</div>
            <div className="login-container">
              
            <img src={petrolImage} alt="Petrol Logo" height="300" width="300"   /> 

                <form className="login-form" onSubmit={submitHandler}>
                    <h1>Login Form</h1>
                    <div className="form-group">
                        <label htmlFor="userName">User Name:</label>
                        <input
                            id="userName"
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Log In</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
