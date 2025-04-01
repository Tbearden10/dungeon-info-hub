import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { getClassTypeIcon } from "@/util/imageUtil";

interface ArmorPiece {
  id: number;
  name: string;
  classType: "Hunter" | "Warlock" | "Titan";
  image: string; // Image link for the armor piece
}

interface ArmorHoverBoxProps {
  type: string;
  pieces: ArmorPiece[];
  position: { x: number; y: number; width: number; height: number }; // Position and size of the card
  onClose: () => void; // Callback to close the hover box
}

export default function ArmorHoverBox({
  pieces,
  position,
  onClose,
}: ArmorHoverBoxProps) {
  const hoverBoxRef = useRef<HTMLDivElement>(null);

  // Close the hover box if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        hoverBoxRef.current &&
        !hoverBoxRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Calculate adjusted position to keep the hover box within the viewport
  const hoverBoxWidth = 256; // Fixed width of the hover box
  const hoverBoxHeight = pieces.length * 60 + 20; // Dynamically calculate height based on content
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const gap = 10; // Minimum gap between the box and the edges

  // Adjust X position to ensure the box stays within the viewport horizontally
  const adjustedX =
    position.x + hoverBoxWidth > viewportWidth
      ? Math.max(viewportWidth - hoverBoxWidth - gap, gap) // Adjust to fit within the right edge
      : Math.max(position.x, gap); // Ensure it doesn't go off the left edge

  // Adjust Y position to move the box up if it's near the bottom edge
  const bottomProximityThreshold = 25; // Threshold for proximity to the bottom edge
  const adjustedY =
    viewportHeight - (position.y + position.height + hoverBoxHeight) < bottomProximityThreshold
      ? position.y - hoverBoxHeight - gap * 2 // Move above the card if near the bottom
      : position.y + position.height + gap; // Place below the card with a small gap

  return ReactDOM.createPortal(
    <div
      ref={hoverBoxRef}
      className="absolute bg-gray-900 text-white rounded-lg shadow-lg z-50 p-4 border border-gray-600"
      style={{
        top: adjustedY,
        left: adjustedX,
        width: `${hoverBoxWidth}px`,
        height: "auto", // Adjust height dynamically based on content
      }}
    >
      <div className="flex flex-col space-y-4">
        {pieces.map((piece) => (
          <div key={piece.id} className="flex items-center space-x-4">
            {/* Armor Image */}
            <img
              src={piece.image}
              alt={piece.name}
              className="w-12 h-12 rounded-md object-cover"
            />
            <div className="flex flex-col">
              {/* Armor Name */}
              <span className="text-sm font-semibold">{piece.name}</span>
              {/* Class Icon */}
              <div className="flex items-center space-x-2">
                <img
                  src={getClassTypeIcon(piece.classType)}
                  alt={`${piece.classType} icon`}
                  className="w-6 h-6"
                />
                <span className="text-xs text-gray-400">{piece.classType}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>,
    document.body // Render the hover box outside the parent container
  );
}