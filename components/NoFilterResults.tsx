import Image from "next/image";
import dogImage from '../public/no-results-doggy.png'

export default function NoFilterResults({ breed }: { breed: string }) {

    return (
        <div className="flex flex-col items-center justify-center gap-2">
            <p>No {breed}s found</p>
            <Image className="opacity-50" src={dogImage} alt="No results" height={200} width={200} />
        </div>
    )
}