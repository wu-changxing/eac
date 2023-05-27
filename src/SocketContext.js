import React, { createContext, useReducer } from "react";

export const SocketContext = createContext();

const initialState = {
    socket: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_SOCKET":
            return {
                ...state,
                socket: action.payload,
            };
        case "CLEAR_SOCKET":
            return initialState;
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

export const SocketProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <SocketContext.Provider value={{ state, dispatch }}>
            {children}
        </SocketContext.Provider>
    );
};
