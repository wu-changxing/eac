import React from 'react';

const ProfileBio = ({ bio }) => (
    <div className="p-6 my-4 bg-white rounded-lg shadow-xl  w-full md:max-w-md lg:max-w-lg text-center">
        <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-4">About Me</h2>
        <p className="text-sm md:text-base">{bio}</p>
    </div>
);

export default ProfileBio;
