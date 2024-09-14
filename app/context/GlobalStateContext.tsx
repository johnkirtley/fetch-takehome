import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GlobalState {
    availableDogs: string[];
    setAvailableDogs: React.Dispatch<React.SetStateAction<string[]>>;
}

const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
    const [availableDogs, setAvailableDogs] = useState<string[]>([]);

    return (
        <GlobalStateContext.Provider value={{ availableDogs, setAvailableDogs }}>
            {children}
        </GlobalStateContext.Provider>
    );
};

export const useGlobalState = () => {
    const context = useContext(GlobalStateContext);
    if (context === undefined) {
        throw new Error('useGlobalState must be used within a GlobalStateProvider');
    }
    return context;
};
