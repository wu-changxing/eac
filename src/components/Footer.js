import React, { useEffect, useState } from 'react';
import InstallButton from "./InstallButton";
import config from "../config";
const Footer = () => {
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
        fetchProfile();
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
        <footer className="w-full h-12 bg-sky-500 flex items-center justify-center transition-all duration-300 hover:bg-sky-700 mb-1">
            <InstallButton/>
            <div className="text-white text-xl p-4 text-center">
                Echo Atrium Chat
            </div>
        </footer>
    );
};

export default Footer;
