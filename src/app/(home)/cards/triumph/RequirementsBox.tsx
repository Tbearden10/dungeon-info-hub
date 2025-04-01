import React from "react";
import ReactDOM from "react-dom";

interface RequirementsBoxProps {
  requirements?: string[];
  position: { x: number; y: number; width: number; height: number };
  width: number; // Width of the box
}

export default function RequirementsBox({
  requirements = [],
  position,
  width,
}: RequirementsBoxProps) {
  const viewportHeight = window.innerHeight;

  // Calculate whether the box would overflow the bottom of the viewport
  const boxHeight = requirements.length * 40 + 20; // Approximate height (40px per item + padding)
  const adjustedY =
    position.y + position.height + boxHeight > viewportHeight
      ? position.y - boxHeight // Place above the card if it overflows
      : position.y + position.height + 10; // Place below the card with a small gap

    return ReactDOM.createPortal(
    <div
      className="absolute bg-gray-800 text-gray-100 rounded-md shadow-lg p-4 z-50 border border-gray-600"
      style={{
        top: adjustedY,
        left: position.x,
        width: `${width}px`, // Match the width of the card
      }}
    >
      <ul className="space-y-2">
        {requirements.map((requirement, index) => (
          <li key={index} className="text-sm text-gray-300">
            {requirement}
            {index < requirements.length - 1 && <hr className="border-gray-600 my-2" />}
          </li>
        ))}
      </ul>
    </div>,
    document.body
  );
}