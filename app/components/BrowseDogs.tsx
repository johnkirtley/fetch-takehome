'use client'

import { useEffect, useState } from 'react';
import withAuth from './ProtectedRoute';
import { Input } from '@/components/ui/input';
import { useGlobalState } from '../context/GlobalStateContext';
import { ChangeEvent } from 'react';
import ModifySort from './ModifySort';
import Link from 'next/link';
import DogCard from './DogCard';
interface Dog {
    id: string
    img: string
    name: string
    age: number
    zip_code: string
    breed: string
}

function BrowseDogs() {
    const { availableDogs, setAvailableDogs } = useGlobalState();
    const [filteredBreeds, setFilteredBreeds] = useState<Dog[]>(availableDogs);

    useEffect(() => {
        async function getAvailableDogs() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/dogs/search`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log('data', data)

                const dogsResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/dogs`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data.resultIds.slice(0, 99))
                });

                if (!dogsResponse.ok) {
                    throw new Error(`HTTP error! status: ${dogsResponse.status}`);
                }

                const dogsData = await dogsResponse.json()
                console.log('dogsData', dogsData);
                setAvailableDogs(dogsData);
                setFilteredBreeds(dogsData); // Set filteredBreeds to the fetched data
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
            const filteredResults = availableDogs.filter((dog) => dog.breed.toLowerCase().includes(term.toLowerCase()));
            setFilteredBreeds(filteredResults);
        }
    }

    return (
        <div>
            Browse Available Dogs Below
            <Input onChange={handleSearch} />
            <ModifySort filteredBreeds={filteredBreeds} setFilteredBreeds={setFilteredBreeds} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredBreeds.map((dog, index) => (
                    <DogCard linkToBreed={true} dog={dog} key={index} />
                ))}
            </div>
        </div>
    )
}

export default withAuth(BrowseDogs);