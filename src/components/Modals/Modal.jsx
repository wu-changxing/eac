// src/components/Modal.js
import React from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import { useSpring, animated } from 'react-spring';

const Modal = ({ isOpen, title, content, confirmText, cancelText, onConfirm, onCancel }) => {
    const animation = useSpring({
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? `scale(1)` : `scale(0.5)`,
        config: { tension: 200, friction: 15 },
    });

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
            <animated.div style={animation} className="bg-white p-6 rounded-lg shadow-xl max-w-xl mx-auto text-gray-800">
                <h3 className="text-2xl font-semibold mb-4">{title}</h3>
                <p>{content}</p>
                <div className="flex items-center justify-end mt-4">
                    <button
                        className="mr-4 text-gray-500"
                        onClick={onCancel}
                    >
                        {cancelText}
                    </button>
                    <button
                        className="flex items-center px-4 py-2 font-semibold text-white transition duration-500 ease-in-out transform bg-red-500 rounded-lg hover:bg-red-600 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2"
                        onClick={onConfirm}
                    >
                        <IoIosCloseCircle className="mr-2"/>
                        <span className="lg:inline hidden">{confirmText}</span>
                    </button>
                </div>
            </animated.div>
        </div>
    );
};

export default Modal;
