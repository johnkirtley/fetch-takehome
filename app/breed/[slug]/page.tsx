"use client";
import { useEffect, useState } from "react";

import DogCard from "../../../components/DogCard";
import { Dog } from "../../../types/interfaces";

export default function Page({ params }: { params: { slug: string } }) {
  const [breedInfo, setBreedInfo] = useState<Dog[]>([]);

  // Format breed name to replace hyphens with spaces and capitalize the first letter of each word
  const formattedBreedName = params.slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  useEffect(() => {
    async function getBreedInfo() {
      try {
        const searchResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/dogs/search?breeds=${formattedBreedName}&size=99`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!searchResponse.ok) {
          throw new Error(`HTTP error! status: ${searchResponse.status}`);
        }

        const searchData = await searchResponse.json();

        const dogsResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/dogs`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(searchData.resultIds),
          }
        );

        if (!dogsResponse.ok) {
          throw new Error(`HTTP error! status: ${dogsResponse.status}`);
        }

        const dogsData = await dogsResponse.json();
        setBreedInfo(dogsData);
      } catch (error) {
        console.error("Error fetching dogs:", error);
      }
    }

    getBreedInfo();
  }, [params.slug]);

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-6">
        View All Our Awesome {formattedBreedName}s
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {breedInfo.map((dog) => (
          <DogCard linkToBreed={false} key={dog.id} dog={dog} />
        ))}
      </div>
    </div>
  );
}
