import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { getClassTypeIcon } from "@/util/imageUtil";

interface ArmorPiece {
  id: number;
  name: string;
  classType: "Hunter" | "Warlock" | "Titan";
  image: string;
}

interface ArmorHoverBoxProps {
  pieces: ArmorPiece[];
  position: { x: number; y: number; width: number; height: number };
  onClose: () => void;
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
  const hoverBoxWidth = pieces.length > 3 ? 512 : 256; // Expand width for 2 columns if 3+ items
  const hoverBoxHeight = Math.ceil(pieces.length / 2) * 60 + 20; // Dynamically calculate height
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const gap = 10; // Minimum gap between the box and the edges

  // Adjust X position to ensure the box stays within the viewport horizontally
  const adjustedX =
    position.x + hoverBoxWidth > viewportWidth
      ? Math.max(viewportWidth - hoverBoxWidth - gap, gap) // Adjust to fit within the right edge
      : Math.max(position.x, gap); // Ensure it doesn't go off the left edge

  // Adjust Y position to move the box up if it's near the bottom edge
  let adjustedY =
    viewportHeight - (position.y + position.height + hoverBoxHeight) < gap
      ? position.y - hoverBoxHeight - gap * 2 // Move above the card if near the bottom
      : position.y + position.height + gap; // Place below the card with a small gap

  // Check if the hover box exceeds the viewport height when moved above, and if so, adjust
  const adjustedBottom = adjustedY + hoverBoxHeight;
  if (adjustedBottom > viewportHeight) {
    adjustedY = position.y - hoverBoxHeight - gap * 2; // Move it above again
  }

  // Ensure that the hover box stays within the viewport height-wise
  if (adjustedY < gap) {
    adjustedY = gap;
  }

  return ReactDOM.createPortal(
    <div
      ref={hoverBoxRef}
      className="absolute bg-gray-900 text-white rounded-lg shadow-lg z-50 p-4 border border-gray-600"
      style={{
        top: adjustedY,
        left: adjustedX,
        width: `${hoverBoxWidth}px`,
        height: "auto", // Adjust height dynamically based on content
        whiteSpace: "nowrap",
        overflow: "visible",
      }}
    >
      <div
        className={`grid gap-4 ${
          pieces.length <= 3 ? "grid-cols-1" : "grid-cols-2"
        }`}
      >
        {pieces.map((piece) => (
          <div key={piece.id} className="flex items-center space-x-4">
            <img
              src={piece.image}
              alt={piece.name}
              className="w-12 h-12 rounded-md object-cover"
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold">{piece.name}</span>
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
    document.body
  );
}