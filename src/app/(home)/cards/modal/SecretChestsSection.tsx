import React, { useState } from "react";
import Image from "next/image";
import Lightbox from "../encounter/Lightbox";
import chestIcon from "../../../../../public/chest.png";

interface SecretChest {
  name: string;
  description: string;
  images: string[];
}

interface SecretChestsSectionProps {
  secretChests: SecretChest[];
}

export default function SecretChestsSection({ secretChests }: SecretChestsSectionProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentChest, setCurrentChest] = useState<SecretChest | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (chest: SecretChest, imageIndex: number) => {
    setCurrentChest(chest);
    setCurrentImageIndex(imageIndex);
    setIsLightboxOpen(true);
  };

  const handlePreviousImage = () => {
    if (currentChest) {
      setCurrentImageIndex((prev) => (prev === 0 ? currentChest.images.length - 1 : prev - 1));
    }
  };

  const handleNextImage = () => {
    if (currentChest) {
      setCurrentImageIndex((prev) => (prev === currentChest.images.length - 1 ? 0 : prev + 1));
    }
  };

  if (!secretChests.length) return null;

  return (
    <div className="bg-gray-800 p-4 rounded-lg border-gray-700">
      <h4 className="text-lg font-semibold text-yellow-400">Secret Chests</h4>
      <div className="space-y-4 mt-2">
        {secretChests.map((chest, chestIndex) => (
          <div key={chestIndex} className="flex justify-between items-center space-y-2">
            <div>
              <h5 className="text-sm font-semibold">{chest.name}</h5>
              <p className="text-xs text-gray-300">{chest.description}</p>
            </div>
            <div className="flex space-x-2">
              {chest.images.map((_, imageIndex) => (
                <button
                  key={imageIndex}
                  onClick={() => openLightbox(chest, imageIndex)}
                  className="flex items-center space-x-2"
                >
                  <Image src={chestIcon} alt="Secret Chest" width={32} height={32} />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {isLightboxOpen && currentChest && (
        <Lightbox
          image={{
            url: currentChest.images[currentImageIndex],
            meta: `${currentChest.name} - Image ${currentImageIndex + 1}`,
          }}
          onClose={() => setIsLightboxOpen(false)}
          onPrevious={handlePreviousImage}
          onNext={handleNextImage}
          currentIndex={currentImageIndex + 1}
          totalImages={currentChest.images.length}
        />
      )}
    </div>
  );
}