import Link from "next/link";

export default function NavMenu() {
  return (
    <div className="flex flex-row justify-between w-11/12 mx-5 my-10">
      <div>
        <Link className="text-lg font-bold" href="/">
          Home
        </Link>
      </div>
      <div className="flex flex-row gap-4">
        <Link className="text-lg font-bold" href="/find-my-match">
          Find My Match
        </Link>
        <Link className="text-lg font-bold" href="/favorites">
          Favorites
        </Link>
      </div>
    </div>
  );
}
