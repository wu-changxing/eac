import React from 'react';
import CheckIn from '../ProfileComponents/CheckIn';
import {useTransition, animated} from "react-spring";
import RoomControl from "./RoomControl";

const RoomPanel = ({
                       users,
                       isAdmin,
                       localStream,
                       openVideo,
                       setOpenVideo,
                   }) => {
    console.log(users)

    const transitions = useTransition(users.length > 0, {
        from: {
            opacity: 0,
            transform: 'perspective(600px) translate3d(100%,0,-4000px) rotateY(180deg) scale(0.1)',
            boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)'
        },
        enter: {
            opacity: 1,
            transform: 'perspective(600px) translate3d(0%,0,0) rotateY(0deg) scale(1)',
            boxShadow: '0px 30px 50px rgba(0, 0, 0, 0.4)',
            config: {friction: 18}
        },
        leave: {
            opacity: 0,
            transform: 'perspective(600px) translate3d(100%,0,-4000px) rotateY(180deg) scale(0.1)',
            boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
            config: {duration: 5}
        },
        config: {mass: 1, tension: 280, friction: 20, precision: 0.00001},
    });

    return (
        transitions((styles, item) => item &&
            <animated.div
                style={styles}
                className={`flex flex-col justify-between mt-4 h-[600px] lg:w-[599] lg:h-[756] p-4 bg-gray-50 border border-gray-300 rounded-md`}
            >
                <div>
                    <h2 className="text-lg font-semibold mb-4 text-indigo-700">Room Panel</h2>
                    <div className="space-y-2">
                        {users && users.map(user =>
                            <p key={user.sid}
                               className="text-sm text-gray-700 bg-gray-200 px-2 py-1 rounded">{user.username}</p>
                        )}
                    </div>
                    <CheckIn className="mt-4" experience={0}/>
                </div>
                <RoomControl
                    isAdmin={isAdmin}
                    localStream={localStream}
                    openVideo={openVideo}
                    setOpenVideo={setOpenVideo}
                    users={users}
                />
            </animated.div>
        )
    );
};

export default RoomPanel;
