"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      <h1 className="text-xl lg:text-4xl font-bold mb-4 text-center">Welcome to Task: Multi-Step Form with Validation</h1>
      <Link href="/form">
        <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Go to Form
        </button>
      </Link>
    </main>
  );
}
