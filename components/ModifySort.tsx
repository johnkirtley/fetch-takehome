import { Button } from './ui/button'
import React from 'react';

interface Dog {
    id: string
    img: string
    name: string
    age: number
    zip_code: string
    breed: string
}

export default function ModifySort({
    filteredBreeds,
    setFilteredBreeds,
}: {
    filteredBreeds: Dog[];
    setFilteredBreeds: React.Dispatch<React.SetStateAction<Dog[]>>;
}) {

    const sortAsc = () => {
        const sortedAsc = filteredBreeds.sort((a: Dog, b: Dog) => a.breed.localeCompare(b.breed));
        setFilteredBreeds([...sortedAsc]);
    }

    const sortDesc = () => {
        const sortedDesc = filteredBreeds.sort((a: Dog, b: Dog) => b.breed.localeCompare(a.breed));
        setFilteredBreeds([...sortedDesc]);
    }

    return (
        <div className='flex flex-col items-center justify-center gap-2'>
            <div>
                <p>Sort By Breed:</p>
            </div>
            <div className='flex gap-2'>
                <Button variant="secondary" onClick={sortAsc}>Asc</Button>
                <Button variant="secondary" onClick={sortDesc}>Desc</Button>
            </div>
        </div>
    )
}