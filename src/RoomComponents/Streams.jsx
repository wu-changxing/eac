// src/RoomComponents/Streams.jsx
import React from 'react';
import Video from "./Video";
import useStreamConnection from './useStreamConnection';

const Streams = ({roomId, localStream, isStreamReady, socket}) => {
    const [streams] = useStreamConnection({roomId, localStream, isStreamReady});

    return (
        <div className="p-4">
            <div className="grid sm:grid-col-1 md:grid-col-2  lg:grid-cols-3 xl:grid-cols-4 gap-2">
                {streams.map((s, index) => (
                    <div key={s.userLabel} className="p-6 bg-white rounded-lg shadow-md">
                        <div className="text-lg font-semibold mb-2 text-gray-700">{index}</div>
                        <Video stream={s.livestream} userLabel={s.userLabel} isLocal={s.isLocal} socket={socket}/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default React.memo(Streams);
