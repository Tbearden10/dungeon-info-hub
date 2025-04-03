import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Lightbox from "./Lightbox"; // Import the Lightbox component

interface ImageData {
  url: string;
  meta: string; // Meta information for the image
}

interface EncounterProps {
  id: number;
  name: string;
  description: string;
  images: ImageData[]; // Updated to include meta info
  enemy_types: string[];
  boss: string | null;
  boss_health: number | null;
  mini_guide?: string; // Optional mini-guide text
  isExpanded: boolean;
  onExpand: () => void;
}

export default function Encounter({
  id,
  name,
  description,
  images,
  enemy_types,
  boss,
  boss_health,
  mini_guide,
  isExpanded,
  onExpand,
}: EncounterProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Handlers for navigating the slideshow
  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="bg-gray-800 p-6 rounded-md scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800 border-gray-700">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-gray-400">{description}</p>
          {isExpanded && <hr className="border-gray-600 my-2" />}
        </div>
        <button
          onClick={onExpand}
          className="text-blue-400 hover:text-blue-500 text-sm flex items-center"
        >
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-4 text-sm text-gray-300 space-y-6">
          {/* Mini-Guide Section */}
          {mini_guide && (
            <div>
              <p className="text-gray-400">{mini_guide}</p>
            </div>
          )}

          {/* Enemy Types and Boss Info */}
          <div className="flex justify-between items-start">
            {/* Enemy Types */}
            <div className="flex-1">
              <h4 className="font-semibold">Enemy Types:</h4>
              <ul className="list-disc list-inside text-gray-400">
                {enemy_types.map((type, index) => (
                  <li key={index}>{type}</li>
                ))}
              </ul>
            </div>

            {/* Boss Info */}
            {boss && (
              <div className="ml-6">
                <h4 className="font-semibold">Boss Info:</h4>
                <p className="text-gray-400">
                  <span className="font-semibold">Name:</span> {boss}
                </p>
                {boss_health && (
                  <p className="text-gray-400">
                    <span className="font-semibold">Health:</span> {boss_health.toLocaleString()}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Image Slideshow */}
          {images.length > 0 && (
            <div>
              <div className="relative w-full h-128 md:h-80">
                <img
                  src={images[currentImageIndex].url}
                  alt={`Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-contain rounded-md cursor-pointer"
                  onClick={() => setIsLightboxOpen(true)} // Open lightbox on click
                />
                {/* Image Tracker */}
                <p className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-md">
                  {currentImageIndex + 1}/{images.length}
                </p>
                {/* Navigation Buttons */}
                <button
                  onClick={handlePreviousImage}
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                >
                  <FaChevronLeft />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                >
                  <FaChevronRight />
                </button>
              </div>
              {/* Image Meta Info */}
              <p className="text-center text-gray-400 mt-2">
                {images[currentImageIndex].meta}
              </p>
            </div>
          )}

          {/* Lightbox */}
          {isLightboxOpen && (
            <Lightbox
              image={images[currentImageIndex]}
              onClose={() => setIsLightboxOpen(false)}
              onPrevious={handlePreviousImage}
              onNext={handleNextImage}
              currentIndex={currentImageIndex + 1}
              totalImages={images.length}
            />
          )}
        </div>
      )}
    </div>
  );
}