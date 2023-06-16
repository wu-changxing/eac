import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import config from '../config';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    // console.log(config)
    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await axios.post(`${config.BACKEND}/eac/api/login/`, {
                username: username,
                password: password,
            });

            if (response && response.data) {
                console.log('Login successful:', response.data);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username',username);
                document.cookie = `token=${response.data.token};path=/;domain=.aaron404.com;`;
                document.cookie = `username=${username};path=/;domain=.aaron404.com;`;
                onLogin(); // Call onLogin prop
            } else {
                console.log('Login failed');
                setError('Login failed.'); // Set error state
            }
        } catch (error) {
            console.error('Error occurred during login:', error);
            if (error.response && error.response.data) {
                setError('Error: ' + error.response.data.detail); // Set error state
            } else {
                setError('An error occurred.'); // Set error state
            }
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 w-full text-4xl lg:text-lg">
            {/*<div className="bg-white w-full rounded shadow-2xl p-4 md:p-8 lg:p-16  mx-2 sm:mx-10 md:mx-0 md:max-w-xl">*/}
            <div className="bg-white w-full rounded shadow-2xl p-4 md:p-8 lg:p-16 mx-2 sm:mx-4 md:mx-20 lg:max-w-xl">
                <h2 className="text-3xl text-center font-bold mb-10 text-gray-800">Login</h2>
                {error && <div className="bg-red-500 p-2 rounded-sm text-white mb-2">{error}</div>}
                <div className="my-8">
                    <label htmlFor="username" className="block mb-8 lg:mb-2 font-bold text-gray-700">Username:</label>
                    <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} className="w-full bg-gray-100 px-3 py-8 lg:py-4 outline-none text-gray-700 focus:ring-2 focus:ring-blue-600 rounded-md" />
                </div>
                <div className="my-8">
                    <label htmlFor="password" className="block mb-8 lg:mb-2 font-bold text-gray-700">Password:</label>
                    <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-gray-100 px-3 py-8 lg:py-4 outline-none text-gray-700 focus:ring-2 focus:ring-blue-600 rounded-md" />
                </div>
                <button onClick={handleLogin} className="w-full py-8 lg:py-4 px-4 mt-4 lg:text-2xl bg-sky-600 text-white rounded shadow hover:bg-sky-500">Login</button>

                <p className="mt-8 text-center text-2xl">Don't have an account? <Link to="/register" className="text-blue-500 hover:text-blue-700">Sign up here</Link>.</p>
            </div>
        </div>
    );
};

export default Login;
