import { useState } from "react";

import { HeartIcon, HeartOffIcon, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { Dog } from "../types/interfaces";
import manageFavorites from "../utils/manageFavorites";

interface DogCardProps {
  dog: Dog;
  linkToBreed: boolean;
}

export default function DogCard({ dog, linkToBreed }: DogCardProps) {
  const [favorites, setFavorites] = useState<string[]>([]);

  const handleFavorites = (id: string, action: "add" | "remove" | "check") => {
    const favorites = manageFavorites(id, action);

    if (action === "check") {
      return favorites;
    }

    setFavorites(favorites);
  };

  return (
    <Card
      key={dog.id}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <CardContent className="relative h-48">
        <Image
          src={dog.img}
          alt={dog.name}
          objectFit="cover"
          layout="fill"
          loading="lazy"
        />
      </CardContent>
      <CardHeader>
        <div>
          <h2 className="text-xl font-semibold mb-2">{dog.name}</h2>
          <p className="text-gray-600">Age: {dog.age}</p>
          <p className="text-gray-600">Zip Code: {dog.zip_code}</p>
        </div>
        <div>
          <Button
            className={`${handleFavorites(dog.id, "check") ? "hidden" : "bg-blue-500 hover:bg-blue-600"}`}
            onClick={() => handleFavorites(dog.id, "add")}
          >
            <HeartIcon className="w-4 h-4" />
          </Button>
          {handleFavorites(dog.id, "check") || favorites.includes(dog.id) ? (
            <Button
              onClick={() => handleFavorites(dog.id, "remove")}
              variant="destructive"
            >
              <HeartOffIcon className="w-4 h-4" />
            </Button>
          ) : null}
        </div>
      </CardHeader>
      <CardFooter>
        <div className="flex flex-col gap-2">
          {linkToBreed ? (
            <Link href={`/breed/${dog.breed.toLowerCase().replace(/ /g, "-")}`}>
              <Button className="w-full" variant="secondary">
                View More {dog.breed}s
              </Button>
            </Link>
          ) : null}
          <Button
            variant="outline"
            className="flex justify-center items-center gap-2 mt-5"
          >
            <Send className="w-4 h-4" />
            <a
              className="text-gray-600"
              href={`mailto:contact@fetch.com?subject=Interested%20In%20${dog.name}`}
            >
              Contact Us About {dog.name}
            </a>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
