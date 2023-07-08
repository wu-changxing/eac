import React from 'react';
import Video from "./Video";
import useStreamConnection from './useStreamConnection';

const Streams = ({roomId, localStream, isStreamReady, socket}) => {
    const [streams] = useStreamConnection({roomId, localStream, isStreamReady});

    return (
        <div className="lg:flex-1 p-2 sm:p-4">
            <div className="flex flex-wrap  ">
                {streams.map((s, index) => (
                    <div key={s.userLabel} className="p-2 sm:p-2 bg-white rounded-lg shadow-md mx-2 my-2 flex-grow max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
                        <Video stream={s.livestream} userLabel={s.userLabel} isLocal={s.isLocal} socket={socket}/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default React.memo(Streams);
