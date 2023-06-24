import React from "react";
import React, { useState, useEffect } from "react";

import {useState} from "react";

import config from "./config";
import ProfileCard from "./ProfileComponents/ProfileCard";
import ProfileState from "./ProfileComponents/ProfileState";
import RecommendationCodeCard from "./ProfileComponents/RecommendationCodeCard";
import ProfileBio from "./ProfileComponents/ProfileBio";
import InvitedUsersCard from "./ProfileComponents/InvitedUsersCard";
import Loading from "./components/Loading";
const Profile = () => {
    // fetch data from API
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
        isLoading ?
           <Loading />
            :
            <div className="flex flex-col items-start px-2 lg:items-center mt-24 text-xl lg:text-lg">

                <ProfileBio bio={bio} />
                <ProfileCard username={username} level={level} invited_by={invited_by} badge={badge} avatar={avatar}/>
                <ProfileState level={level} credits={credits} experience={experience} invited_by={invited_by} />
                <RecommendationCodeCard />
                <InvitedUsersCard />
            </div>
    );
};

export default Profile;
