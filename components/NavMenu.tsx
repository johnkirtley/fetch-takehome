"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavMenu() {
  const pathname = usePathname();

  const isLoginPage = pathname === "/login";

  if (isLoginPage) return null;

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
