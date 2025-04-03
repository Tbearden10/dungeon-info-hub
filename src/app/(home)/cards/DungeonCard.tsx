import React, { useState } from "react";
import ExpandedDungeonModal from "./ExpandedDungeonModal";

interface ExoticWeapon {
  id: number;
  name: string;
  hash: number;
  type: string;
  weaponType: string;
  damageType: string;
  ammoType: string;
  image: string;
  description: string;
}

interface Title {
  name: string;
  icon: string;
}

interface Dungeon {
  id: number;
  name: string;
  hash: number;
  description: string;
  image: string;
  location: string;
  requirements: string[];
  exoticWeapon?: ExoticWeapon;
  loot: any[];
  encounters: any[];
  title?: Title;
  colorScheme: {
    primary: string; // e.g., "#1E3A8A" (blue)
    secondary: string; // e.g., "#3B82F6" (lighter blue)
  };
}

interface DungeonCardProps {
  dungeon: Dungeon;
}

export default function DungeonCard({ dungeon }: DungeonCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative max-w-4xl bg-gray-900 text-white rounded-2xl overflow-hidden shadow-lg transition-all hover:shadow-2xl border border-gray-900 flex flex-col h-full w-full">
      {/* Dungeon Image */}
      <div className="relative h-64">
        <img
          src={dungeon.image}
          alt={dungeon.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <h2 className="text-2xl font-bold">{dungeon.name}</h2>
          <p className="text-sm text-gray-300">{dungeon.location}</p>
        </div>
      </div>

      {/* Dungeon Info */}
      <div className="p-5 flex-grow flex flex-col">
        <p className="text-md text-gray-400 flex-grow">{dungeon.description}</p>

        {/* Requirements */}
        {dungeon.requirements.length > 0 && (
          <div className="mt-4">
            <h3 className="text-md font-semibold text-yellow-400">Requirements</h3>
            <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
              {dungeon.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Button */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white py-3 px-4 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
        >
          Explore Dungeon
        </button>
      </div>

      {/* Expanded Modal */}
      {isModalOpen && <ExpandedDungeonModal dungeon={dungeon} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}