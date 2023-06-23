import React from 'react';

const ProfileBio = ({ bio }) => (
    <div className="m-2 md:m-4 mt-4 md:mt-10 p-2 md:p-4 bg-white rounded-lg shadow-lg transform transition-all ease-in-out duration-350 w-full md:max-w-md lg:max-w-lg text-center">
        <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-4">About Me</h2>
        <p className="text-sm md:text-base">{bio}</p>
    </div>
);

export default ProfileBio;
