'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
    Card,
    CardContent,
    CardHeader,
    CardFooter
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"


interface Dog {
    id: string
    img: string
    name: string
    age: number
    zip_code: string
    breed: string
}

export default function Page({ params }: { params: { slug: string } }) {
    const [breedInfo, setBreedInfo] = useState<Dog[]>([])
    const [favorites, setFavorites] = useState<string[]>([])

    useEffect(() => {
        async function getBreedInfo() {
            const formattedSlug = params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
            try {
                const searchResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/dogs/search?breeds=${formattedSlug}&size=99`, {
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
                setBreedInfo(dogsData);

            } catch (error) {
                console.error('Error fetching dogs:', error);
            }
        }

        getBreedInfo();
    }, [params.slug]);

    const addFavorite = (id: string) => {
        const currentFavorites = localStorage.getItem('favorites')
        const parsedFavorites = JSON.parse(currentFavorites || '[]')
        const newFavorites = [...parsedFavorites, id]
        localStorage.setItem('favorites', JSON.stringify(newFavorites));

        setFavorites(newFavorites);
    }

    const removeFavorite = (id: string) => {
        const currentFavorites = localStorage.getItem('favorites')
        const parsedFavorites = JSON.parse(currentFavorites || '[]')
        const updatedFavorites = parsedFavorites.filter((favId: string) => favId !== id)
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        setFavorites(updatedFavorites);
    }

    const checkFavorites = (id: string) => {
        const storedFavorites = localStorage.getItem('favorites');
        const parsedFavorites = JSON.parse(storedFavorites || '[]');
        return parsedFavorites.includes(id);
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">{params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {breedInfo.map((dog) => (
                    <Card key={dog.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <CardContent className="relative h-48">
                            <Image
                                src={dog.img}
                                alt={dog.name}
                                objectFit="cover"
                                layout="fill"
                            />
                        </CardContent>
                        <CardHeader>
                            <h2 className="text-xl font-semibold mb-2">{dog.name}</h2>
                            <p className="text-gray-600">Age: {dog.age}</p>
                            <p className="text-gray-600">Zip Code: {dog.zip_code}</p>
                        </CardHeader>
                        <CardFooter>
                            <Button
                                className={`mt-2 ${checkFavorites(dog.id) ? 'hidden' : 'bg-blue-500 hover:bg-blue-600'}`}
                                onClick={() => addFavorite(dog.id)}
                            >
                                {favorites.includes(dog.id) || checkFavorites(dog.id) ? 'Favorited' : 'Add To Favorites'}
                            </Button>
                            {checkFavorites(dog.id) || favorites.includes(dog.id) ? <Button onClick={() => removeFavorite(dog.id)} variant='destructive'>Remove From Favorites</Button> : null}
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}