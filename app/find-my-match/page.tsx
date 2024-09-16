'use client'

import withAuth from '../../components/ProtectedRoute';
import manageFavorites from '../../utils/manageFavorites';
import { Button } from '../../components/ui/button';
import findMatch from '../../utils/findMatch';
import { useState } from 'react';
import DogCard from '../../components/DogCard';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
interface Dog {
    id: string
    img: string
    name: string
    age: number
    zip_code: string
    breed: string
}
function FindMyMatch() {
    const [match, setMatch] = useState<Dog | null>(null);
    const [showConfetti, setShowConfetti] = useState(false);
    const { width, height } = useWindowSize();

    const searchForMatch = async () => {
        const allFavorites = manageFavorites('get');
        const match = await findMatch(allFavorites);
        console.log('match', match);
        setMatch(match[0]);
        setShowConfetti(true);
        setTimeout(() => {
            setShowConfetti(false);
        }, 7000);
    }
    return (
        <div className='flex flex-col items-center justify-center'>
            <h1 className='text-2xl lg:text-4xl text-center font-bold mt-5'>Ready to find your best match?</h1>
            <Button className='my-5' onClick={searchForMatch}>I&apos;m ready! Find my match</Button>
            {showConfetti && <Confetti width={width} height={height} />}
            {match && <DogCard dog={match} linkToBreed={true} />}
        </div>
    )
}

export default withAuth(FindMyMatch);