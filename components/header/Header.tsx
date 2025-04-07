"use client";

import Navbar from "./navbar/Navbar";

export default function Header() {
  return (
    <header className="w-full dark:bg-transparent sticky top-2 z-50">
        {/* Navbar Component */}
        <Navbar />
    </header>
  );
}
