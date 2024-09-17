"use client";
import { useEffect, useState } from "react";

import DogCard from "../../../components/DogCard";
import { Dog } from "../../../types/interfaces";
import { getDogByBreed } from "../../../utils/getDogByBreed";

export default function Page({ params }: { params: { slug: string } }) {
  const [breedInfo, setBreedInfo] = useState<Dog[]>([]);

  // Format breed name to replace hyphens with spaces and capitalize the first letter of each word
  const formattedBreedName = params.slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const getBreedInfo = async () => {
    const breedInfo = await getDogByBreed(formattedBreedName);
    setBreedInfo(breedInfo);
  };

  useEffect(() => {
    getBreedInfo();
  }, []);

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
