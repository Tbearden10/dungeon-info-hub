"use client";

import React, { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="relative w-64">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a Guardian..."
        className="w-full p-2 pl-4 text-sm text-white bg-gray-800/70 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}