import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getAllBreeds } from "@/utils/getAllBreeds";

interface FilterBreedsProps {
  setSelectedBreed: (breed: string) => void;
  selectedBreed: string;
}

export default function FilterBreeds({
  setSelectedBreed,
  selectedBreed,
}: FilterBreedsProps) {
  const [breeds, setBreeds] = useState<string[]>([]);

  const getAvailableDogs = async () => {
    try {
      const breedList = await getAllBreeds();
      setBreeds(breedList);
    } catch (error) {
      console.error("Error fetching dogs:", error);
    }
  };

  useEffect(() => {
    getAvailableDogs();
  }, []);

  const handleBreedChange = (breed: string) => {
    setSelectedBreed(breed);
  };

  return (
    <Select
      onValueChange={(value) => handleBreedChange(value)}
      defaultValue={"all"}
      value={selectedBreed}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Breed" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem key={breeds.length + 1} value={"all"}>
          All Breeds
        </SelectItem>
        {breeds.map((breed, idx) => (
          <SelectItem key={idx + 1} value={breed}>
            {breed}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
