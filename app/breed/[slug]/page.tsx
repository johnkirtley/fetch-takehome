'use client'
import { useState, useEffect } from 'react';
import DogCard from '../../../components/DogCard';
import { Dog } from '../../../types/interfaces';


export default function Page({ params }: { params: { slug: string } }) {
    const [breedInfo, setBreedInfo] = useState<Dog[]>([])

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
                setBreedInfo(dogsData);

            } catch (error) {
                console.error('Error fetching dogs:', error);
            }
        }

        getBreedInfo();
    }, [params.slug]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">View All Our Awesome {params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}s</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {breedInfo.map((dog) => (
                    <DogCard linkToBreed={false} key={dog.id} dog={dog} />
                ))}
            </div>
        </div>
    )
}