'use client'

import { useEffect, useState } from 'react';
import withAuth from './ProtectedRoute';
import { useGlobalState } from '../context/GlobalStateContext';
import ModifySort from './ModifySort';
import DogCard from './DogCard';
import FilterBreeds from './FilterBreeds';
import getDogs from '../utils/getDogs';
import getBreedData from '../utils/getBreedData';
import Paginate from './Paginate';

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
    const [refetchTrigger, setRefetchTrigger] = useState(0);
    const [paginationInfo, setPaginationInfo] = useState({
        prev: '',
        next: ''
    })

    useEffect(() => {
        async function getAvailableDogs() {
            try {
                const { dogsData, searchResponse } = await getDogs(sortType);
                setAvailableDogs(dogsData);
                setFilteredBreeds(dogsData);
                setSelectedBreed('all');
                setPaginationInfo({
                    prev: searchResponse.prev,
                    next: searchResponse.next
                })
            } catch (error) {
                console.error('Error fetching dogs:', error);
            }
        }

        getAvailableDogs();
    }, [setAvailableDogs, sortType, refetchTrigger]);

    useEffect(() => {
        async function getBreedInfo() {
            try {
                const { dogsData, searchData } = await getBreedData(selectedBreed);
                setFilteredBreeds(dogsData);
                setPaginationInfo({
                    prev: searchData.prev,
                    next: searchData.next
                })
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

    }, [selectedBreed])

    useEffect(() => {
        console.log('filteredBreeds', filteredBreeds)
        setAvailableDogs(filteredBreeds)

    }, [filteredBreeds])

    return (
        <div>
            <div className='flex flex-col md:flex-row justify-center items-center gap-5 mb-5'>
                <div className='flex flex-col items-center justify-center gap-2'>
                    <p>Filter</p>
                    <FilterBreeds setSelectedBreed={setSelectedBreed} selectedBreed={selectedBreed} />
                </div>
                <ModifySort setSortType={setSortType} triggerRefetch={() => setRefetchTrigger(prev => prev + 1)} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredBreeds.length > 0 ? filteredBreeds.map((dog, index) => (
                    <DogCard linkToBreed={true} dog={dog} key={index} />
                )) : null}
            </div>
            <Paginate paginationInfo={paginationInfo} sortType={sortType} setFilteredBreeds={setFilteredBreeds} setPaginationInfo={setPaginationInfo} />
        </div>
    )
}

export default withAuth(BrowseDogs);