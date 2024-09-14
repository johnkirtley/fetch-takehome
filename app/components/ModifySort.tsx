import { Button } from '../../components/ui/button'
import React from 'react';

export default function ModifySort({
    filteredBreeds,
    setFilteredBreeds,
}: {
    filteredBreeds: string[];
    setFilteredBreeds: React.Dispatch<React.SetStateAction<string[]>>;
}) {

    const sortAsc = () => {
        const sortedAsc = filteredBreeds.sort((a: string, b: string) => a.localeCompare(b));
        setFilteredBreeds([...sortedAsc]);
    }

    const sortDesc = () => {
        const sortedDesc = filteredBreeds.sort((a: string, b: string) => b.localeCompare(a));
        setFilteredBreeds([...sortedDesc]);
    }

    return (
        <div>
            Sort By:
            <Button onClick={sortAsc}>Asc</Button>
            <Button onClick={sortDesc}>Desc</Button>
        </div>
    )
}