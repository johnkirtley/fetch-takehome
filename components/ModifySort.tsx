import { Button } from './ui/button'
import React from 'react';

export default function ModifySort({
    setSortType
}: {
    setSortType: React.Dispatch<React.SetStateAction<string>>;
}) {

    return (
        <div className='flex flex-col items-center justify-center gap-2'>
            <div>
                <p>Sort By Breed:</p>
            </div>
            <div className='flex gap-2'>
                <Button variant="secondary" onClick={() => setSortType('asc')}>Asc</Button>
                <Button variant="secondary" onClick={() => setSortType('desc')}>Desc</Button>
            </div>
        </div>
    )
}