import { useEffect, useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


export default function FilterBreeds({ setSelectedBreed }: { setSelectedBreed: (breed: string) => void }) {
    const [breeds, setBreeds] = useState<string[]>([]);

    useEffect(() => {
        async function getAvailableDogs() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/dogs/breeds`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setBreeds(data);
            } catch (error) {
                console.error('Error fetching dogs:', error);
            }
        }

        getAvailableDogs();
    }, []);

    const handleBreedChange = (breed: string) => {
        setSelectedBreed(breed);
    }

    return (
        <Select onValueChange={(value) => handleBreedChange(value)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Breed" />
            </SelectTrigger>
            <SelectContent>
                {breeds.map((breed, idx) => (
                    <SelectItem key={idx} value={breed}>{breed}</SelectItem>
                ))}
            </SelectContent>
        </Select>

    )
}