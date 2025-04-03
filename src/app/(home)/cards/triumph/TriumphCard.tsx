import React from "react";

interface Reward {
  id: number;
  name: string;
  hash: number;
  type: string;
  images: string[];
}

interface Triumph {
  id: number;
  name: string;
  hash: number;
  icon: string;
  description: string;
  requirements: string[];
  rewards?: Reward[];
  isTitleRequirement?: boolean;
}

interface TriumphCardProps {
  triumph: Triumph;
}

export default function TriumphCard({ triumph }: TriumphCardProps) {
  return (
    <div className="relative group rounded-md border-gray-700 bg-gray-800 p-4 flex flex-row space-x-4 hover:bg-black/80 transition-opacity transform transition-transform duration-200">
      {/* Title Requirement Indicator */}
      {triumph.isTitleRequirement && (
        <div className="absolute bottom-3 right-0 text-xs text-gray-400 flex items-center space-x-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          fill="currentColor"
          className="bi bi-star"
          viewBox="0 0 16 16"
        >
          <path d="M8 .25a.75.75 0 0 1 .648.372l1.76 3.574 3.95.575a.75.75 0 0 1 .416 1.276l-2.86 2.786.674 3.938a.75.75 0 0 1-1.088.79L8 12.11l-3.54 1.862a.75.75 0 0 1-1.088-.79l.674-3.938-2.86-2.786a.75.75 0 0 1 .416-1.276l3.95-.575 1.76-3.574A.75.75 0 0 1 8 .25z" />
        </svg>
      </div>
      )}

      {/* Remaining card content */}
      <div className="flex flex-col items-center justify-center space-y-2">
        {!triumph.rewards || triumph.rewards.length === 0 ? (
          <img
            src={triumph.icon}
            alt={triumph.name}
            className="w-16 h-16 rounded-md object-cover"
          />
        ) : null}

        {triumph.rewards && triumph.rewards.length > 0 && (
          <div className="flex flex-col items-center space-y-2">
            {triumph.rewards.map((reward) => (
              <img
                key={reward.id}
                src={reward.images[0]}
                alt={reward.name}
                className="w-16 h-16 rounded-md object-cover"
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <h3 className="text-lg font-semibold text-white">{triumph.name}</h3>
        <p className="text-sm text-gray-400">{triumph.description}</p>
      </div>

      {/* Rewards and interactions */}
      <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-md p-2">
        {triumph.rewards && triumph.rewards.length > 0 ? (
          triumph.rewards.map((reward) => (
            <div key={reward.id} className="flex flex-col items-center">
              {reward.type === "emblem" && reward.images[1] ? (
                <>
                  <img
                    src={reward.images[1]}
                    alt={reward.name}
                    className="h-16 w-auto rounded-md object-contain border border-gray-600 mb-2"
                  />
                  <span className="text-white text-sm text-center">{reward.name}</span>
                </>
              ) : null}

              {reward.type !== "emblem" && (
                <span className="text-white text-sm text-center">{reward.name}</span>
              )}
            </div>
          ))
        ) : (
          <span className="text-white text-sm">No rewards available</span>
        )}
      </div>
    </div>
  );
}
