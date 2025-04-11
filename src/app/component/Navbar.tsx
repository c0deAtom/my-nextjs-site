"use client";

import { useEffect, useState } from "react";

import Link from "next/link";


export default function Navbar() {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const storedName = (localStorage.getItem("userData"));
    if (storedName) {
        const parsed = JSON.parse(storedName)
      setUserName(parsed.name);
    }
  }, []);

  return (
    <nav className="w-full bg-blue-600 text-white py-3 px-6 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="text-xl font-bold">
          <Link href="/">{userName? "Welcome  " + userName :"Welcome"}</Link>
        </div>
        <ul className="flex gap-4 text-sm">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/habits">Habits</Link></li>
          <li><Link href="/graph">Graph</Link></li>
        </ul>
      
      </div>
    </nav>
  );
}
