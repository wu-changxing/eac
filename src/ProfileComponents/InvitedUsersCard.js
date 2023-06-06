// InvitedUsersCard.js

import React, {useState, useEffect} from "react";
import {FaFeatherAlt,  FaFeather} from 'react-icons/fa';
import {GiFeatherWound, GiFeatheredWing, GiSpikyWing,GiCurlyWing, GiTwoFeathers} from 'react-icons/gi';
import config from "../config";

// Array of colors
const colors = ['#0AA4FD', '#FD1A94', '#F91165', '#00d562'];
const icons = [<FaFeatherAlt/>,  <FaFeather/>, <GiFeatherWound/>, <GiFeatheredWing/>, <GiSpikyWing/>, <GiCurlyWing/>, <GiTwoFeathers/>];

const InvitedUsersCard = () => {
    const [invitedUsers, setInvitedUsers] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetch(`${config.DJ_END}/eac/api/get-invited-users/`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log("data:", data);
                if (data.error) {
                    console.log("Error fetching users");
                } else {
                    setInvitedUsers(data.invited_users);
                }
            });
    }, []);

    return (
        <div className="m-4 mt-16 lg:my-2 p-4 text-5xl lg:text-lg bg-white rounded-lg shadow-lg transform transition-all ease-in-out duration-350 w-full lg:max-w-md text-center">
            <h2 className="font-bold mb-8"> invited with by Me</h2>
            <div className="flex flex-wrap space-x-2 text-white">
                {invitedUsers.map((user, index) => (
                    <span
                        key={index}
                        className="font-bold inline-flex items-center px-2.5 py-0.5 rounded-full font-medium m-1"
                        style={{backgroundColor: colors[index % colors.length], color: 'white'}}
                    >
              {icons[index % icons.length]}
                        {user.username}
            </span>
                ))}
            </div>
        </div>
    );
};

export default InvitedUsersCard;
