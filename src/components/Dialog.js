// src/components/Dialog.js
import { AiOutlineClose } from 'react-icons/ai';
import React from 'react';

const Dialog = ({isOpen, onClose, children}) => {
    return isOpen ? (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-white rounded-lg px-4 pt-5 pb-4 overflow-auto shadow-xl transform transition-all max-w-sm w-full">
                    <div className="absolute top-0 right-0 pt-4 pr-4">
                        <button onClick={onClose}>
                            <AiOutlineClose className="h-6 w-6 text-gray-400 hover:text-gray-500" />
                        </button>
                    </div>
                    {children}

                </div>
            </div>
        </div>
    ) : null;
};

export default Dialog;
