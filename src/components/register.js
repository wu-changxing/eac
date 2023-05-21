import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import config from '../config';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [recommendationCode, setRecommendationCode] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password1 !== password2) {
            setError('Passwords must match');
            return;
        }

        axios.post(`${config.BACKEND}/eac/api/register/`, {
            username,
            password: password1,
            password2,
            recommendation_code: recommendationCode,
        })
            .then(() => {
                // Registration successful, redirect to login page
                window.location.href = '/login';
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    let errorMessage = "";
                    for (let key in error.response.data) {
                        errorMessage += `${key}: ${error.response.data[key]}\n`;
                    }
                    setError(errorMessage);
                } else {
                    setError('An unknown error occurred');
                }
            });

    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-sky-500 animate-pulse">
            <div className="bg-white p-8 md:p-16 rounded shadow-2xl w-full max-w-lg animate-fade-in-down">
                <h2 className="text-3xl font-bold mb-10 text-gray-800">Register</h2>
                {error && <div className="bg-red-500 p-2 rounded-sm text-white mb-2">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" className="w-full px-3 py-2 outline-none text-gray-700 focus:ring-2 focus:ring-sky-blue-500 rounded-md"/>
                    </div>
                    <div className="mb-5">
                        <input type="password" id="password1" value={password1} onChange={e => setPassword1(e.target.value)} placeholder="Password" className="w-full px-3 py-2 outline-none text-gray-700 focus:ring-2 focus:ring-sky-blue-500 rounded-md"/>
                    </div>
                    <div className="mb-5">
                        <input type="password" id="password2" value={password2} onChange={e => setPassword2(e.target.value)} placeholder="Confirm password" className="w-full px-3 py-2 outline-none text-gray-700 focus:ring-2 focus:ring-sky-blue-500 rounded-md"/>
                    </div>
                    <div className="mb-5">
                        <input type="text" id="recommendationCode" value={recommendationCode} onChange={e => setRecommendationCode(e.target.value)} placeholder="Recommendation code" className="w-full px-3 py-2 outline-none text-gray-700 focus:ring-2 focus:ring-sky-blue-500 rounded-md"/>
                        <p className="text-xs text-gray-600">You can get a recommendation code from other users or the admin. Learn more about the <Link to="/recommendation-code-info" className="text-blue-600 hover:underline">recommendation code</Link>.</p>
                    </div>
                    <button type="submit" className="w-full p-3 mt-4 bg-blue-600 text-white rounded shadow hover:bg-blue-500">Register</button>
                </form>
                <p className="mt-8 text-center">Already have an account? <Link to="/login" className="text-blue-500 hover:text-blue-700">Login here</Link>.</p>
            </div>
        </div>


    );
};

export default Register;

