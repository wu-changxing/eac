import React, { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa'; // Font Awesome
import { MdCancel } from 'react-icons/md';
import {GiWaveSurfer} from "react-icons/gi"; // Material Design

const CreateRoomModal = ({ isOpen, onClose, onCreate }) => {
    const [roomName, setRoomName] = useState("");

    const handleCreate = (event) => {
        event.preventDefault(); // Prevent form from refreshing the page
        onCreate(roomName);
        setRoomName("");
        onClose();
    };

    return isOpen ? (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
                    <form onSubmit={handleCreate} className="bg-white px-4 py-10 lg:pb-8">
                        <h3 className="lg:text-lg leading-6 text-xl text-gray-900">Input the room name here</h3>
                        <div className="mt-10 p-2">
                            <input
                                autoFocus
                                type="text"
                                className="shadow-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full lg:text-xl text-xl border-gray-300 rounded-md p-4"
                                placeholder="Room name"
                                value={roomName}
                                onChange={(e) => setRoomName(e.target.value)}
                            />
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                                type="submit"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-500 text-xl font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:ml-3 sm:w-auto "
                            >
                                <GiWaveSurfer className="mr-3 text-5xl" />
                            </button>
                            <button
                                type="button"
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-xl font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto "
                                onClick={onClose}
                            >
                                <MdCancel className="mr-3 text-5xl" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    ) : null;
};

export default CreateRoomModal;
