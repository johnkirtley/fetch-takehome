'use client'

import { useEffect, useState } from 'react';
import withAuth from './ProtectedRoute';
import { useGlobalState } from '../context/GlobalStateContext';
import ModifySort from './ModifySort';
import DogCard from './DogCard';
import FilterBreeds from './FilterBreeds';
import NoFilterResults from './NoFilterResults';
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
    const [selectedBreed, setSelectedBreed] = useState<string>('');
    const [noResults, setNoResults] = useState<boolean>(false);

    useEffect(() => {
        async function getAvailableDogs() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/dogs/search?size=100&sort=breed:asc`, {
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

                if (dogsData.length === 0) {
                    setNoResults(true);
                }

                setAvailableDogs(dogsData);
                setFilteredBreeds(dogsData); // Set filteredBreeds to the fetched data
            } catch (error) {
                console.error('Error fetching dogs:', error);
            }
        }

        getAvailableDogs();
    }, [setAvailableDogs]);

    useEffect(() => {
        async function getBreedInfo() {
            try {
                const searchResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/dogs/search?breeds=${selectedBreed}&size=99`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!searchResponse.ok) {
                    throw new Error(`HTTP error! status: ${searchResponse.status}`);
                }

                const searchData = await searchResponse.json();
                console.log('searchData', searchData);

                const dogsResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/dogs`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(searchData.resultIds)
                });

                if (!dogsResponse.ok) {
                    throw new Error(`HTTP error! status: ${dogsResponse.status}`);
                }

                const dogsData = await dogsResponse.json()
                console.log('dogsData', dogsData);
                setFilteredBreeds(dogsData);

            } catch (error) {
                console.error('Error fetching dogs:', error);
            }
        }

        if (selectedBreed && selectedBreed !== 'all') {
            getBreedInfo();
        }

        if (selectedBreed === 'all') {
            setFilteredBreeds(availableDogs);
        }

    }, [selectedBreed, availableDogs])

    return (
        <div>
            <div className='flex flex-col md:flex-row justify-center items-center gap-5 mb-5'>
                <div className='flex flex-col items-center justify-center gap-2'>
                    <p>Filter</p>
                    <FilterBreeds setSelectedBreed={setSelectedBreed} />
                </div>
                <ModifySort filteredBreeds={filteredBreeds} setFilteredBreeds={setFilteredBreeds} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredBreeds.length > 0 ? filteredBreeds.map((dog, index) => (
                    <DogCard linkToBreed={true} dog={dog} key={index} />
                )) : null}
            </div>
            {noResults ? <NoFilterResults breed={selectedBreed} /> : null}
        </div>
    )
}

export default withAuth(BrowseDogs);