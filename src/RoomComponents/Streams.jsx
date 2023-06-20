import React from 'react';
import Video from "./Video";
import useStreamConnection from './useStreamConnection';

const Streams = ({roomId, localStream, isStreamReady, socket}) => {
    const [streams] = useStreamConnection({roomId, localStream, isStreamReady});

    return (
        <div className="flex-1 p-4">
            <div className="flex flex-wrap -mx-2"> {/* Added flex and flex-wrap properties */}
                {streams.map((s, index) => (
                    <div key={s.userLabel} className="p-6 bg-white rounded-lg shadow-md mx-2 my-2 flex-grow max-w-sm"> {/* Added margins for separation */}
                        <Video stream={s.livestream} userLabel={s.userLabel} isLocal={s.isLocal} socket={socket}/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default React.memo(Streams);
