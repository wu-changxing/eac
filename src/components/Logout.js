import { useEffect } from "react";

function Logout({ onLogout }) {
    const username = localStorage.getItem('username');
    useEffect(() => {
        localStorage.removeItem('token');
        onLogout();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-500 p-4">
            <div className="bg-white p-4 sm:p-8 md:p-16 rounded shadow-2xl w-full md:max-w-md lg:max-w-xl mx-5">
                <h1 className="text-3xl font-bold mb-10 text-gray-800">Logout</h1>
                <div className="text-lg text-gray-700">Goodbye, {username}</div>
            </div>
        </div>
    );
}

export default Logout;
