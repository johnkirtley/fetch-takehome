'use client'

import { useEffect, useState } from 'react';
import withAuth from './ProtectedRoute';
import { useGlobalState } from '../context/GlobalStateContext';
import ModifySort from './ModifySort';
import DogCard from './DogCard';
import FilterBreeds from './FilterBreeds';
import getDogs from '../utils/getDogs';
import getBreedData from '../utils/getBreedData';
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
    const [sortType, setSortType] = useState<string>('asc');

    useEffect(() => {
        async function getAvailableDogs() {
            try {
                const allDogs = await getDogs(sortType);
                setAvailableDogs(allDogs);
                setFilteredBreeds(allDogs);
            } catch (error) {
                console.error('Error fetching dogs:', error);
            }
        }

        getAvailableDogs();
    }, [setAvailableDogs, sortType]);

    useEffect(() => {
        async function getBreedInfo() {
            try {
                const breedData = await getBreedData(selectedBreed);
                setFilteredBreeds(breedData);
            } catch (error) {
                console.error('Error fetching breed data:', error);
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
                <ModifySort setSortType={setSortType} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredBreeds.length > 0 ? filteredBreeds.map((dog, index) => (
                    <DogCard linkToBreed={true} dog={dog} key={index} />
                )) : null}
            </div>
        </div>
    )
}

export default withAuth(BrowseDogs);