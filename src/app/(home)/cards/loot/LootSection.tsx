import React from "react";
import WeaponLootCard from "./WeaponLootCard";
import ArmorLootCard from "./ArmorLootCard";

interface LootItem {
  id: number;
  name: string;
  type: "weapon" | "armor";
  weaponType?: string;
  armorType?: string;
  classType?: "Hunter" | "Warlock" | "Titan";
  energy?: string;
  ammo?: string;
  image: string;
  encounterId: number[]; // Updated to reflect that this is an array
}

interface Encounter {
  id: number;
  name: string;
}

interface LootSectionProps {
  loot: LootItem[];
  encounters: Encounter[];
  exoticWeapon: any;
}

export default function LootSection({ loot, encounters }: LootSectionProps) {
  // Filter encounters to include only those that drop loot
  const encountersWithLoot = encounters.filter((encounter) =>
    loot.some((item) => item.encounterId.includes(encounter.id)) // Check if encounter ID exists in the array
  );

  return (
    <div className="space-y-12">
      {encountersWithLoot.map((encounter) => (
        <div key={encounter.id} className="space-y-6">
          <h3 className="text-xl font-semibold border-b border-gray-600 pb-2">
            {encounter.name}
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weapons Section */}
            <div className="space-y-4">
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                {loot
                  .filter(
                    (item) =>
                      item.encounterId.includes(encounter.id) && item.type === "weapon"
                  )
                  .map((weapon) => (
                    <WeaponLootCard key={weapon.id} {...weapon} className="transform scale-75" />
                  ))}
              </div>
            </div>

            {/* Armor Section */}
            <div className="space-y-4">
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                {Object.entries(
                  loot
                    .filter(
                      (item) =>
                        item.encounterId.includes(encounter.id) && item.type === "armor"
                    )
                    .reduce((acc: { [key: string]: LootItem[] }, item) => {
                      if (item.armorType) {
                        acc[item.armorType] = acc[item.armorType] || [];
                        acc[item.armorType].push(item);
                      }
                      return acc;
                    }, {})
                ).map(([armorType, pieces]) => (
                  <ArmorLootCard
                    key={armorType}
                    type={armorType}
                    pieces={pieces.filter(
                      (piece): piece is LootItem & { classType: "Hunter" | "Warlock" | "Titan" } =>
                        piece.classType !== undefined
                    )}
                    className="transform scale-75"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}