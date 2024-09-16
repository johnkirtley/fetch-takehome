import { Button } from './ui/button'
import React from 'react';

interface ModifySortProps {
    setSortType: (sortType: string) => void;
    triggerRefetch: () => void;
}

function ModifySort({ setSortType, triggerRefetch }: ModifySortProps) {
    const handleSortChange = (newSortType: string) => {
        setSortType(newSortType);
        triggerRefetch();
    };

    return (
        <div className='flex flex-col items-center justify-center gap-2'>
            <div>
                <p>Sort By Breed:</p>
            </div>
            <div className='flex gap-2'>
                <Button variant="secondary" onClick={() => handleSortChange('asc')}>Asc</Button>
                <Button variant="secondary" onClick={() => handleSortChange('desc')}>Desc</Button>
            </div>
        </div>
    )
}

export default ModifySort;