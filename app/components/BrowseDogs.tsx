'use client'

import { useEffect, useState } from 'react';
import withAuth from './ProtectedRoute';
import { Input } from '@/components/ui/input';
import { useGlobalState } from '../context/GlobalStateContext';
import { ChangeEvent } from 'react';
import ModifySort from './ModifySort';

function BrowseDogs() {
    const { availableDogs, setAvailableDogs } = useGlobalState();
    const [filteredBreeds, setFilteredBreeds] = useState(availableDogs);

    useEffect(() => {
        async function getAvailableDogs() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/dogs/breeds`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log('data', data)
                setAvailableDogs(data);
                setFilteredBreeds(data); // Set filteredBreeds to the fetched data
            } catch (error) {
                console.error('Error fetching dogs:', error);
            }
        }

        getAvailableDogs();
    }, [setAvailableDogs]);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;

        if (term === '') {
            setFilteredBreeds(availableDogs);
        } else {
            const filteredResults = availableDogs.filter((dog) => dog.toLowerCase().includes(term.toLowerCase()));
            setFilteredBreeds(filteredResults);
        }
    }

    return (
        <div>
            Browse Available Dogs Below
            <Input onChange={handleSearch} />
            <ModifySort filteredBreeds={filteredBreeds} setFilteredBreeds={setFilteredBreeds} />
            <ul>
                {filteredBreeds.map((dog, index) => (
                    <li key={index}>{dog}</li>
                ))}
            </ul>
        </div>
    )
}

export default withAuth(BrowseDogs);