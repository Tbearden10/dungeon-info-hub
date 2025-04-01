import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { getDamageTypeIcon, getAmmoTypeIcon } from "@/util/imageUtil";

interface WeaponBoxProps {
  name: string;
  weaponType?: string;
  damageType?: string;
  ammoType?: string;
  unlockRequirements?: string[]; // Optional unlock requirements
  position: { x: number; y: number; width: number; height: number }; // Position and size of the card
  onClose: () => void; // Callback to close the box
}

export default function WeaponBox({
  name,
  weaponType,
  damageType,
  ammoType,
  unlockRequirements,
  position,
  onClose,
}: WeaponBoxProps) {
  const boxRef = useRef<HTMLDivElement>(null);

  // Close the box if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Calculate adjusted position to keep the box within the viewport
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const boxWidth = 300; // Fixed width of the box
  const boxHeight = 200; // Approximate height of the box

  const adjustedX =
    position.x + boxWidth > viewportWidth
      ? Math.max(viewportWidth - boxWidth - 10, 10) // Adjust to fit within the right edge
      : Math.max(position.x, 10); // Ensure it doesn't go off the left edge

  const adjustedY =
    position.y + position.height + boxHeight > viewportHeight
      ? position.y - (position.height * 2) - 10 // Adjust to fit above the card, closer to the card
      : position.y + position.height + 10; // Place below the card with a smaller gap

  return ReactDOM.createPortal(
    <div
      ref={boxRef}
      className="absolute bg-gray-800 text-white rounded-lg shadow-lg z-50 p-4 border border-gray-600"
      style={{
        top: adjustedY,
        left: adjustedX,
        maxWidth: `${boxWidth}px`,
        width: "auto",
        height: "auto",
      }}
    >
      <h4 className="text-base font-bold text-yellow-400 mb-2">{name}</h4>
      <div className="flex flex-col space-y-2">
        {weaponType && (
          <div className="text-sm text-gray-300">
            <span className="font-semibold text-gray-400">Type:</span> {weaponType}
          </div>
        )}
        <div className="flex items-center space-x-2">
          {ammoType && (
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-700">
              <img
                src={getAmmoTypeIcon(ammoType)}
                alt={`${ammoType} icon`}
                className="w-6 h-6"
              />
            </div>
          )}
          {damageType && (
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-700">
              <img
                src={getDamageTypeIcon(damageType)}
                alt={`${damageType} icon`}
                className="w-6 h-6"
              />
            </div>
          )}
        </div>
        {unlockRequirements && unlockRequirements.length > 0 && (
          <div className="mt-4">
            <h5 className="text-sm font-semibold text-gray-100 mb-2">Unlock Requirements:</h5>
            <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
              {unlockRequirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>,
    document.body // Render the box outside the parent container
  );
}