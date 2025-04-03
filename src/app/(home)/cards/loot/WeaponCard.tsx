import React from "react";
import { getDamageTypeIcon, getAmmoTypeIcon } from "@/util/imageUtil";

interface Weapon {
  id: number;
  name: string;
  image: string;
  weaponType: string;
  damageType: string;
  ammoType: string;
}

const WeaponCard = ({ weapon }: { weapon: Weapon }) => {
  return (
    <div className="relative bg-gray-900 p-4 rounded-xl border border-gray-700 group w-36 h-36 flex flex-col items-center justify-center shadow-lg transition-transform transform hover:scale-105">
      <img src={weapon.image} alt={weapon.name} className="w-16 h-16 rounded-lg object-cover" />
      <h3 className="text-sm font-semibold text-white mt-2 text-center">{weapon.name}</h3>
      <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-xl space-y-2">
        {weapon.damageType && <img src={getDamageTypeIcon(weapon.damageType)} alt={weapon.damageType} className="w-8 h-8" />}
        {weapon.ammoType && <img src={getAmmoTypeIcon(weapon.ammoType)} alt={weapon.ammoType} className="w-8 h-8" />}
      </div>
    </div>
  );
};

export default WeaponCard;