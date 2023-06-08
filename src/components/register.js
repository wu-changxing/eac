import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';
import config from '../config';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [recommendationCode, setRecommendationCode] = useState('');
    const [error, setError] = useState('');
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const recommendationCodeParam = searchParams.get('recommendation_code');
        console.log(recommendationCodeParam);
        if (recommendationCodeParam) {
            setRecommendationCode(decodeURIComponent(recommendationCodeParam.replace(/\+/g, '%20')));
        }
    }, [searchParams]);


    console.log(recommendationCode)


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
            .then(response => {
                // Save username and token to local storage
                localStorage.setItem('username', username);
                localStorage.setItem('token', response.data.token);
                // Redirect to home page
                window.location.href = '/';
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
        <div className="min-h-screen flex items-center justify-center bg-blue-500 p-4 w-full text-4xl lg:text-lg">
            <div className="bg-white w-full rounded shadow-2xl p-4 md:p-8 lg:p-16 mx-2 sm:mx-4 md:mx-20 lg:max-w-xl">
                <h2 className="text-3xl text-center font-bold mb-10 text-gray-800">Register</h2>
                <p className="text-red-400 text-center">请不要使用微信内置浏览器进行注册。 建议使用Chrome Firefox 浏览器</p> {/* The new line */}
                {error && <div className="bg-red-500 p-2 rounded-sm text-white mb-2">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="my-4">
                        <label htmlFor="username" className="block mb-8 lg:mb-2 font-bold text-gray-700">Username:</label>
                        <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} className="w-full bg-gray-100 px-3 py-8 lg:py-4 outline-none text-gray-700 focus:ring-2 focus:ring-blue-600 rounded-md" />
                    </div>
                    <div className="my-4">
                        <label htmlFor="password1" className="block mb-8 lg:mb-2 font-bold text-gray-700">Password:</label>
                        <input type="password" id="password1" value={password1} onChange={e => setPassword1(e.target.value)} className="w-full bg-gray-100  px-3 py-8 lg:py-4 outline-none text-gray-700 focus:ring-2 focus:ring-blue-600 rounded-md" />
                    </div>
                    <div className="my-4">
                        <label htmlFor="password2" className="block mb-8 lg:mb-2 font-bold text-gray-700">Confirm Password:</label>
                        <input type="password" id="password2" value={password2} onChange={e => setPassword2(e.target.value)} className="w-full bg-gray-100 px-3 py-8 lg:py-4 outline-none text-gray-700 focus:ring-2 focus:ring-blue-600 rounded-md" />
                    </div>
                    <div className="my-4">
                        <label htmlFor="recommendationCode" className="block mb-8 lg:mb-2 font-bold text-gray-700">Recommendation Code:</label>
                        <input type="text" id="recommendationCode" value={recommendationCode} onChange={e => setRecommendationCode(e.target.value)} className="w-full bg-gray-100 px-3 py-8 lg:py-4 outline-none text-gray-700 focus:ring-2 focus:ring-blue-600 rounded-md" />
                    </div>
                    <button type="submit" className="w-full py-8 lg:py-4 px-4 mt-4 lg:text-2xl bg-sky-600 text-white rounded shadow hover:bg-sky-500">Register</button>
                </form>
                <p className="mt-8 text-center text-4xl lg:text-xl">Already have an account? <Link to="/login" className="text-blue-500 hover:text-blue-700">Login here</Link>.</p>
                <p className="mt-8 text-center text-4xl lg:text-xl">  邀请码获取请查看 <a src="https://aaron404.com/zh/eac-log/%E4%B8%80%E4%B8%AA%E7%AE%80%E7%9F%AD%E7%9A%84%E9%82%80%E8%AF%B7/" className="text-blue-500 hover:text-blue-700">这个说明</a></p>
            </div>
        </div>
    );
};

export default Register;
