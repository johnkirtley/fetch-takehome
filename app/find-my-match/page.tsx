'use client'
import withAuth from '../../components/ProtectedRoute';
import Link from 'next/link';
import manageFavorites from '../../utils/manageFavorites';
import { Button } from '../../components/ui/button';
import findMatch from '../../utils/findMatch';
import { useState, useEffect } from 'react';
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
    const [favoritesExist, setFavoritesExist] = useState(false);
    const { width, height } = useWindowSize();

    useEffect(() => {
        const allFavorites = manageFavorites('get');
        setFavoritesExist(allFavorites.length > 0);
    }, []);

    const searchForMatch = async () => {
        const allFavorites = manageFavorites('get');

        if (allFavorites.length === 0) {
            setFavoritesExist(false);
            return;
        }

        const match = await findMatch(allFavorites);
        setMatch(match[0]);

        setShowConfetti(true);
        setTimeout(() => {
            setShowConfetti(false);
        }, 7000);
    }

    return (
        <div className='flex flex-col items-center justify-center p-8'>
            <h1 className='text-2xl text-center font-bold mt-5'>Ready to find your new best friend?</h1>
            <div className='my-5'>
                {favoritesExist ? <Button onClick={searchForMatch}>Find my match</Button> : <Button variant="secondary"><Link href="/">Add some favorites first</Link></Button>}
            </div>
            {showConfetti && <Confetti width={width} height={height} />}
            {match && <DogCard dog={match} linkToBreed={true} />}
        </div>
    )
}

export default withAuth(FindMyMatch);