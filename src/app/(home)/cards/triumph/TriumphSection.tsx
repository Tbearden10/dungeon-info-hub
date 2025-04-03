import React from "react";
import TriumphCard from "./TriumphCard";

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

interface TriumphSectionProps {
  triumphs: Triumph[];
}

export default function TriumphSection({ triumphs }: TriumphSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[85vh] overflow-y-auto hide-scrollbar">
      {triumphs.map((triumph) => (
        <TriumphCard key={triumph.id} triumph={triumph} />
      ))}
    </div>
  );
}