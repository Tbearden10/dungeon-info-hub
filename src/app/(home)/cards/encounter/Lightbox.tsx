import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface LightboxProps {
  image: { url: string; meta: string };
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  currentIndex: number;
  totalImages: number;
}

export default function Lightbox({
  image,
  onClose,
  onPrevious,
  onNext,
  currentIndex,
  totalImages,
}: LightboxProps) {
  return (
    <div
      className="fixed inset-0 flex flex-col justify-center items-center z-50 backdrop-blur-lg bg-black/70"
      onClick={onClose} // Close lightbox when clicking outside the image
    >
      {/* Close Button */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent closing when clicking the button
          onClose();
        }}
        className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
      >
        Close
      </button>

      {/* Image */}
      <div
        className="max-w-[90vw] max-h-[90vh] overflow-hidden relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
      >
        <img
          src={image.url}
          alt="Lightbox"
          className="w-full h-full object-contain rounded-md"
        />
      </div>

      {/* Image Tracker */}
      <p className="text-gray-300 mt-4 text-center px-4">
        {currentIndex}/{totalImages}
      </p>

      {/* Image Meta Info */}
      <p className="text-gray-300 mt-2 text-center px-4">{image.meta}</p>

      {/* Navigation Buttons */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent closing when clicking the button
          onPrevious();
        }}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent closing when clicking the button
          onNext();
        }}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70"
      >
        <FaChevronRight />
      </button>
    </div>
  );
}