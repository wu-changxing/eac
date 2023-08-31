import React, { useEffect, useState } from 'react';
import InstallButton from "../components/InstallButton";
import config from "../config";
import {Link} from "react-router-dom";
import {FaHome, FaSignOutAlt, FaUserCircle} from "react-icons/fa";
import {GiWoodenSign} from "react-icons/gi";
const Footer = ({authenticated}) => {
    const [profileData, setProfileData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchProfile = async () => {
        try {
            console.log('fetching profile');
            const token = localStorage.getItem('token');
            const response = await fetch(`${config.DJ_END}/eac/api/user-profile/`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            console.log('response:', response)
            if (!response.ok) {
                throw new Error('Error fetching profile');
            }
            const data = await response.json();
            console.log('data:', data);
            setProfileData(data);

            // 新增部分：存入 localStorage
            localStorage.setItem('exp', data.exp);
            localStorage.setItem('level', data.level);
            localStorage.setItem('badge', data.badge ? data.badge : null);
            console.log("the bage is ", data.badge)



            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    }

    useEffect(() => {
        if (authenticated) {
            fetchProfile();
        }
    }, []);

    const username = profileData ? profileData.username : 'No one';
    const level = profileData ? profileData.level : 0;
    const credits = profileData ? profileData.credits : 0;
    const totalCredits = 100;
    const invited_by = profileData ? profileData.invited_by ? profileData.invited_by : 'Admin' : 'No one';
    const experience = profileData ? profileData.exp : 0;
    const badge = profileData ? profileData.badge ? profileData.badge : 'No badge' : 'No badge';
    const bio = profileData ? profileData.bio ? profileData.bio : 'No bio' : 'No bio';
    const avatar = profileData ? profileData.avatar ? profileData.avatar : 'No avatar' : 'No avatar';


    const totalExperience = 300;

    const progressPercentageCredits = (credits / totalCredits) * 100;
    const progressPercentageExperience = (experience / totalExperience) * 100;

    return (
        <footer className="w-full transition-all duration-300 mb-1 bg-sky-500 h-13 md:h-12">
            <div className="hidden md:flex flex-row items-center justify-center">
                <span className="text-white text-xl p-2">Echo Atrium Chat</span>
            </div>
            <div className="flex items-center justify-around h-16 md:hidden">
                {authenticated &&
                    <>
                        <div className="text-center p-3 rounded-full hover:bg-sky-600">
                            <Link to="/" className="flex flex-col items-center">
                                <FaHome className="text-2xl text-white"/>
                                <span className="text-xs text-white">Home</span>
                            </Link>
                        </div>
                        <div className="text-center p-3 rounded-full hover:bg-sky-600">
                            <Link to="/profile" className="flex flex-col items-center">
                                <FaUserCircle className="text-2xl text-white"/>
                                <span className="text-xs text-white">Profile</span>
                            </Link>
                        </div>
                        <div className="text-center p-3 rounded-full hover:bg-sky-600">
                            <Link to="/events" className="flex flex-col items-center">
                                <GiWoodenSign className="text-2xl text-white"/>
                                <span className="text-xs text-white">Events</span>
                            </Link>
                        </div>
                        <div className="text-center p-3 rounded-full hover:bg-sky-600">
                            <Link to="/logout" className="flex flex-col items-center">
                                <FaSignOutAlt className="text-2xl text-white"/>
                                <span className="text-xs text-white">Logout</span>
                            </Link>
                        </div>
                    </>
                }
            </div>
        </footer>
    );
};

export default Footer;
