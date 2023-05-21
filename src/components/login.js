import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import config from '../config';
import axiosInstance from "./axiosInstance";

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/eac/api/login/', {
                username: username,
                password: password,
            });

            if (response && response.data) {
                // Handle successful response here
                console.log('Login successful:', response.data);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username',username);
                onLogin(); // Call onLogin prop
            } else {
                // Handle unsuccessful response here
                console.log('Login failed');
            }
        } catch (error) {
            // Handle errors gracefully
            console.error('Error occurred during login:', error);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-500">
            <div className="bg-white p-8 md:p-16 rounded shadow-2xl w-full max-w-lg">
                <h2 className="text-3xl font-bold mb-10 text-gray-800">Login</h2>
                {error && <div className="bg-red-500 p-2 rounded-sm text-white mb-2">{error}</div>}
                <div className="mb-5">
                    <label htmlFor="username" className="block mb-2 text-sm font-bold text-gray-700">Username:</label>
                    <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} className="w-full px-3 py-2 outline-none text-gray-700 focus:ring-2 focus:ring-blue-600 rounded-md" />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-700">Password:</label>
                    <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-3 py-2 outline-none text-gray-700 focus:ring-2 focus:ring-blue-600 rounded-md" />
                </div>
                <button onClick={handleLogin} className="w-full p-3 mt-4 bg-sky-600 text-white rounded shadow hover:bg-sky-500">Login</button>
                <p className="mt-8 text-center">Don't have an account? <Link to="/register" className="text-blue-500 hover:text-blue-700">Sign up here</Link>.</p>
            </div>
        </div>

    );
};

export default Login;
