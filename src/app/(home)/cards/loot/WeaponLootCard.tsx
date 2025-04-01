import React, { useState } from "react";
import WeaponBox from "./WeaponBox";

interface WeaponLootCardProps {
  name: string;
  type: "weapon" | "armor";
  weaponType?: string;
  image: string;
  damageType?: string;
  ammoType?: string;
  className?: string; // Allow custom className for resizing
}

export default function WeaponLootCard({
  name,
  weaponType,
  image,
  damageType,
  ammoType,
  className,
}: WeaponLootCardProps) {
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
      {/* Maintain aspect ratio for the card */}
      <div className="aspect-w-1 aspect-h-1">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      {isExpanded && cardPosition && (
        <WeaponBox
          name={name}
          weaponType={weaponType}
          damageType={damageType}
          ammoType={ammoType}
          position={cardPosition}
          onClose={handleClose}
        />
      )}
    </div>
  );
}