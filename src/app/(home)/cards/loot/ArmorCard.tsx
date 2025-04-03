import React from "react";
import { getClassTypeIcon } from "@/util/imageUtil";

interface Armor {
  id: number;
  name: string;
  type: string;
  image: string;
  classType: string;
}

const ArmorCard = ({ armor }: { armor: Armor }) => {
  return (
    <div className="relative bg-gray-900 p-4 rounded-xl border-gray-700 group w-36 h-36 flex flex-col items-center justify-center shadow-lg transition-transform transform hover:scale-105">
      <img src={armor.image} alt={armor.name} className="w-16 h-16 rounded-lg object-cover" />
      <h3 className="text-sm font-semibold text-white mt-2 text-center">{armor.name}</h3>
      <div className="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
        <img src={getClassTypeIcon(armor.classType)} alt={armor.classType} className="w-10 h-10" />
      </div>
    </div>
  );
};

export default ArmorCard;