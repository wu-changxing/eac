import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import config from '../config';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await axios.post(`${config.BACKEND}/eac/api/login/`, {
                username: username,
                password: password,
            },
            {
                withCredentials: true, // 允许发送凭据，如 cookie
                    headers: {
                'Content-Type': 'application/json', // 设置请求头为 application/json
            },
            }
            );

            if (response && response.data) {
                console.log('Login successful:', response.data);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username',username);
                document.cookie = `token=${response.data.token};path=/;domain=.aaron404.com;`;
                document.cookie = `username=${username};path=/;domain=.aaron404.com;`;
                onLogin();
            } else {
                console.log('Login failed');
                setError('Login failed.');
            }
        } catch (error) {
            console.error('Error occurred during login:', error);
            if (error.response && error.response.data) {
                // Here we check if we received an error message from the server
                let errorMsg = 'Error: ';
                if (typeof error.response.data.error === 'object' && error.response.data.error.non_field_errors) {
                    errorMsg += error.response.data.error.non_field_errors[0];
                } else {
                    errorMsg += error.response.data.error;
                }
                setError(errorMsg);
            } else  {
                setError('An error occurred.');
            }
        }
    }

    return (
        <div className="w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto text-xl sm:text-2xl lg:text-lg">
            <div className="bg-white rounded shadow-2xl p-4 sm:p-6 lg:p-8">
                <h2 className="text-2xl sm:text-3xl text-center font-bold mb-10 text-gray-800">Login</h2>
                {error && <div className="bg-red-500 p-2 rounded-sm text-white mb-2">{error}</div>}
                <div className="my-4">
                    <label htmlFor="username" className="block mb-2 font-bold text-gray-700">Username:</label>
                    <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} className="w-full bg-gray-100 px-3 py-2 lg:py-4 outline-none text-gray-700 focus:ring-2 focus:ring-blue-600 rounded-md" />
                </div>
                <div className="my-4">
                    <label htmlFor="password" className="block mb-2 font-bold text-gray-700">Password:</label>
                    <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-gray-100 px-3 py-2 lg:py-4 outline-none text-gray-700 focus:ring-2 focus:ring-blue-600 rounded-md" />
                </div>
                <button onClick={handleLogin} className="w-full py-2 lg:py-4 px-4 mt-4 lg:text-xl bg-sky-600 text-white rounded shadow hover:bg-sky-500">Login</button>
                <p className="mt-8 text-center text-xl sm:text-2xl">Don't have an account? <Link to="/register" className="text-blue-500 hover:text-blue-700">Sign up here</Link>.</p>
            </div>
        </div>
    );
};

export default Login
