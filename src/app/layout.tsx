"use client";
import "./globals.css";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const isDark = !darkMode;
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className="bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
        <QueryClientProvider client={queryClient}>
          <div className="flex justify-end p-4">
            <button
              onClick={toggleDarkMode}
              className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
            >
              {darkMode ? "Light" : "Dark"} Mode
            </button>
          </div>

          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
