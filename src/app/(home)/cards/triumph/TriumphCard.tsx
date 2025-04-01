import React, { useState } from "react";
import RequirementsBox from "./RequirementsBox";

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
  reward?: Reward;
}

interface TriumphCardProps {
  triumph: Triumph;
}

export default function TriumphCard({ triumph }: TriumphCardProps) {
  const [cardPosition, setCardPosition] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const handleMouseEnter = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setCardPosition({
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    });
  };

  const handleMouseLeave = () => {
    setCardPosition(null);
  };

  return (
    <div
      className="relative group rounded-md overflow-hidden border border-gray-700 bg-gray-800 p-4 flex flex-col space-y-4"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Triumph Content */}
      <div className="flex justify-between items-center">
        {/* Icon and Name/Description */}
        <div className="flex flex-col items-center space-y-2">
          {/* Triumph Icon */}
          <img
            src={triumph.icon}
            alt={triumph.name}
            className="w-16 h-16 rounded-md object-cover"
          />

          {/* Reward Icon (if any) */}
          {triumph.reward && (
            <img
              src={triumph.reward.image}
              alt={triumph.reward.name}
              className="w-16 h-16 rounded-md object-cover"
            />
          )}
        </div>

        {/* Name and Description */}
        <div className="flex-1 pl-4">
          <h3 className="text-lg font-semibold text-white">{triumph.name}</h3>
          <p className="text-sm text-gray-400">{triumph.description}</p>
        </div>
      </div>

      {/* Requirements Box */}
      {cardPosition && (
        <RequirementsBox
          requirements={triumph.requirements}
          position={cardPosition}
          width={cardPosition.width} // Pass the card's width
        />
      )}
    </div>
  );
}