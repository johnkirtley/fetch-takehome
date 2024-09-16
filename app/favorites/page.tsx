'use client'
import { useEffect, useState } from 'react'
import withAuth from '../../components/ProtectedRoute'
import manageFavorites from '../../utils/manageFavorites'
import DogCard from '../../components/DogCard'
import getDogsById from '../../utils/getDogsById'

interface Dog {
    id: string
    img: string
    name: string
    age: number
    zip_code: string
    breed: string
}

function Favorites() {
    const [favorites, setFavorites] = useState<Dog[]>([])

    const getCurrentFavorites = async () => {
        const currentFavorites = await manageFavorites('get')
        const favoritedDogs = await getDogsById(currentFavorites)
        setFavorites(favoritedDogs)
    }


    useEffect(() => {
        getCurrentFavorites()
    }, [])

    return (
        <div className='flex flex-col items-center justify-center p-8'>
            <h1 className='text-2xl font-bold mb-5'>Your Favorites</h1>
            {!favorites.length ? <p className='text-lg'>No favorites yet</p> : null}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {favorites.length > 0 ? favorites.map((favorite) => (
                    <DogCard key={favorite.id} dog={favorite} linkToBreed={true} />
                )) : null}
            </div>
        </div>
    )
}

export default withAuth(Favorites);