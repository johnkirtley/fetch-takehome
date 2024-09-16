import Link from "next/link";

export default function NavMenu() {
  return (
    <div className="flex flex-row justify-between w-11/12 mx-5 my-10">
      <div>
        <Link href="/">Home</Link>
      </div>
      <div className="flex flex-row gap-4">
        <Link href="/find-my-match">Find My Match</Link>
        <Link href="/favorites">Favorites</Link>
      </div>
    </div>
  );
}
