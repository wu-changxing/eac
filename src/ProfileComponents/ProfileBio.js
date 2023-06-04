// ProfileBio.js
import React from 'react';

const ProfileBio = ({ bio }) => (
    <div className="m-4 my-10 lg:my-2 p-4 bg-white rounded-lg shadow-lg transform transition-all ease-in-out duration-350 w-full lg:max-w-md text-center">
        <h2 className="font-bold mb-4">About Me</h2>
        <p>{bio}</p>
    </div>
);

export default ProfileBio;
