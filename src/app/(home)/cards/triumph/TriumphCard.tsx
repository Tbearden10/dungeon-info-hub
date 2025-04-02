import React, { useState } from "react";

interface Reward {
  id: number;
  name: string;
  hash: number;
  image: string;
}

interface Triumph {
  id: number;
  name: string;
  hash: number;
  icon: string;
  description: string;
  requirements: string[];
  rewards?: Reward[];
}

interface TriumphCardProps {
  triumph: Triumph;
}

export default function TriumphCard({ triumph }: TriumphCardProps) {
  const [hoveredReward, setHoveredReward] = useState<string | null>(null);

  return (
    <div className="relative group rounded-md border border-gray-700 bg-gray-800 p-4 flex flex-row space-x-4">
      {/* Icon and Rewards Section */}
      <div className="flex flex-col items-center justify-center space-y-2">
        {/* Main Icon (only if no rewards exist) */}
        {!triumph.rewards || triumph.rewards.length === 0 ? (
          <img
            src={triumph.icon}
            alt={triumph.name}
            className="w-16 h-16 rounded-md object-cover"
          />
        ) : null}

        {/* Rewards Section */}
        {triumph.rewards && triumph.rewards.length > 0 && (
          <div className="flex flex-col items-center space-y-2">
            {triumph.rewards.map((reward) => (
              <div
                key={reward.id}
                className="relative"
                onMouseEnter={() => setHoveredReward(reward.name)}
                onMouseLeave={() => setHoveredReward(null)}
              >
                <img
                  src={reward.image}
                  alt={reward.name}
                  className="w-16 h-16 rounded-md object-cover"
                />
                {/* Tooltip for Reward Name */}
                {hoveredReward === reward.name && (
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded shadow-lg z-50 whitespace-nowrap">
                    {reward.name}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Name and Description */}
      <div className="flex-1 flex flex-col justify-center">
        <h3 className="text-lg font-semibold text-white">{triumph.name}</h3>
        <p className="text-sm text-gray-400">{triumph.description}</p>
      </div>
    </div>
  );
}