"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "./SearchBar";

export default function Header() {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSearchError = () => {
    setError("Search functionality is disabled.");
    setShowModal(true);
  };

  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-md bg-gradient-to-r from-gray-900/70 via-gray-800/50 to-gray-900/70 border-b border-gray-700 p-4 flex items-center justify-between shadow-lg">
        {/* Logo and Title */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push("/")}>
          <img
            src="/dih.png"
            alt="Dungeon Tracker Logo"
            className="h-8 w-8"
          />
          <h1 className="text-xl font-bold text-white tracking-wide">DIH Report</h1>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-4">
          <SearchBar />
        </div>
      </header>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-2">Error</h2>
            <p className="text-sm text-gray-700">{error}</p>
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}