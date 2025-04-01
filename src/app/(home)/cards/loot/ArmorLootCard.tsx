import React, { useState } from "react";
import ArmorHoverBox from "./ArmorBox";
import { getArmorTypeIcon } from "@/util/imageUtil";

interface ArmorPiece {
  id: number;
  name: string;
  classType: "Hunter" | "Warlock" | "Titan";
  image: string;
}

interface ArmorLootCardProps {
  type: string;
  pieces: ArmorPiece[];
  className?: string; // Allow custom className for resizing
}

export default function ArmorLootCard({
  type,
  pieces,
  className,
}: ArmorLootCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [cardPosition, setCardPosition] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const handleCardClick = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setCardPosition({
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    });
    setIsExpanded((prev) => !prev);
  };

  const handleClose = () => {
    setIsExpanded(false);
  };

  return (
    <div
      className={`relative group rounded-md overflow-hidden border border-gray-700 cursor-pointer ${className}`}
      onClick={handleCardClick}
    >
      {/* Display only the armor type icon */}
      <div className="aspect-w-1 aspect-h-1 relative bg-gray-800 rounded-md">
        <img
          src={getArmorTypeIcon(type)}
          alt={`${type} icon`}
          className="w-full h-full object-cover"
        />
        {/* Overlay with hover effect */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white text-sm font-semibold uppercase">
            {type}
          </span>
        </div>
      </div>
      {/* Popup for armor pieces */}
      {isExpanded && cardPosition && (
        <ArmorHoverBox
          type={type}
          pieces={pieces}
          position={cardPosition}
          onClose={handleClose}
        />
      )}
    </div>
  );
}