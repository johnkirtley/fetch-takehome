"use client";

import BrowseDogs from "../components/BrowseDogs";
import { GlobalStateProvider } from "../context/GlobalStateContext";

export default function Home() {
  return (
    <GlobalStateProvider>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <BrowseDogs />
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
      </div>
    </GlobalStateProvider>
  );
}
