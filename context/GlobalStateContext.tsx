import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Dog {
    id: string
    img: string
    name: string
    age: number
    zip_code: string
    breed: string
}

interface GlobalState {
    availableDogs: Dog[];
    setAvailableDogs: React.Dispatch<React.SetStateAction<Dog[]>>;
    favorites: string[];
    setFavorites: React.Dispatch<React.SetStateAction<string[]>>;
}

const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
    const [availableDogs, setAvailableDogs] = useState<Dog[]>([]);
    const [favorites, setFavorites] = useState<string[]>([]);

    return (
        <GlobalStateContext.Provider value={{ availableDogs, setAvailableDogs, favorites, setFavorites }}>
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
