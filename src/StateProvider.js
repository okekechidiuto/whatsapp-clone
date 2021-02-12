import React, { createContext, StateContext, useContext,  useReducer } from "react";

export const StateContet = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer (reducer, initialState)}>
    {children}
    </StateContext.Provider>
);

export const useStateValue = () => useContext (StateContext);