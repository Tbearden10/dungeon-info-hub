import React from "react";
import ArmorCard from "./ArmorCard";
import WeaponCard from "./WeaponCard";

interface LootItem {
  id: number;
  name: string;
  type: string;
  weaponType?: string | null;
  armorType?: string | null;
  classType?: string | null;
  damageType?: string | null;
  ammoType?: string | null;
  image: string;
  encounterId: number[]; // Encounter IDs associated with the loot item
}

interface Encounter {
  id: number;
  name: string;
}

interface LootSectionProps {
  loot: LootItem[];
  encounters: Encounter[];
}

const armorOrder = ["helmet", "gauntlets", "chest", "legs", "classitem"];
const classOrder = ["warlock", "hunter", "titan"];

export default function LootSection({ loot, encounters }: LootSectionProps) {
  // Filter loot items associated with encounter ID 0 (loot for all encounters)
  const allEncountersLoot = loot.filter((item) => item.encounterId.includes(0));
  
  return (
    <div className="gap-4 flex flex-col">
      {/* Display loot for all encounters (ID 0) if any */}
      {allEncountersLoot.length > 0 && (
        <div className="bg-gray-800 p-4 rounded-xl shadow-lg border-gray-700">
          <h2 className="text-xl font-bold text-yellow-400 mb-3">Loot drops for all encounters</h2>
          <div className="gap-4 flex flex-col">
            {/* Weapons for all encounters */}
            {allEncountersLoot.filter((item) => item.type === "weapon").length > 0 && (
              <div>
                <h3 className="text-md font-semibold text-gray-300 mb-2">Weapons</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 gap-y-3">
                  {allEncountersLoot
                    .filter((item) => item.type === "weapon")
                    .map((weapon: any) => (
                      <WeaponCard key={weapon.id} weapon={weapon} />
                    ))}
                </div>
              </div>
            )}
  
            {/* Armor for all encounters */}
            {allEncountersLoot.filter((item) => item.type === "armor").length > 0 && (
              <div>
                <h3 className="text-md font-semibold text-gray-300 mb-2">Armor</h3>
                <div className="gap-3 flex flex-col">
                  {armorOrder.map((armorType) => {
                    const filteredArmor = allEncountersLoot.filter(
                      (item) => item.armorType?.toLowerCase() === armorType
                    );
                    if (filteredArmor.length === 0) return null;
                    return (
                      <div key={armorType} className="mt-2">
                        <h4 className="text-sm font-semibold text-gray-400 capitalize mb-1">{armorType}</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 gap-y-3">
                          {classOrder.map((classType) => {
                            const classFilteredArmor = filteredArmor.filter(
                              (item) => item.classType?.toLowerCase() === classType
                            );
                            if (classFilteredArmor.length === 0) return null;
                            return (
                              <React.Fragment key={classType}>
                                {classFilteredArmor.map((armorItem: any) => (
                                  <ArmorCard key={armorItem.id} armor={armorItem} />
                                ))}
                              </React.Fragment>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
  
      {/* Loop over other encounters and display their loot */}
      {encounters
        .filter((encounter) => encounter.id !== 0) // Exclude encounter with ID 0
        .map((encounter) => {
          const encounterLoot = loot.filter((item) => item.encounterId.includes(encounter.id));
          const weapons = encounterLoot.filter((item) => item.type === "weapon");
          const armor = encounterLoot.filter((item) => item.type === "armor");
  
          if (encounterLoot.length === 0) return null;
  
          return (
            <div key={encounter.id} className="bg-gray-800 p-4 rounded-xl shadow-lg border-gray-700">
              <h2 className="text-xl font-bold text-yellow-400 mb-3">{encounter.name}</h2>
              <div className="gap-4 flex flex-col">
                {weapons.length > 0 && (
                  <div>
                    <h3 className="text-md font-bold text-gray-300 mb-2">Weapons</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 gap-y-3">
                      {weapons.map((weapon: any) => (
                        <WeaponCard key={weapon.id} weapon={weapon} />
                      ))}
                    </div>
                  </div>
                )}
                {armor.length > 0 && (
                  <div>
                    <h3 className="text-md font-bold text-gray-300 mb-2">Armor</h3>
                    <div className="gap-3 flex flex-col">
                      {armorOrder.map((armorType) => {
                        const filteredArmor = armor.filter(
                          (item) => item.armorType?.toLowerCase() === armorType
                        );
                        if (filteredArmor.length === 0) return null;
                        return (
                          <div key={armorType} className="mt-2">
                            <h4 className="text-sm font-semibold text-gray-400 capitalize mb-1">{armorType}</h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 gap-y-3">
                              {classOrder.map((classType) => {
                                const classFilteredArmor = filteredArmor.filter(
                                  (item) => item.classType?.toLowerCase() === classType
                                );
                                if (classFilteredArmor.length === 0) return null;
                                return (
                                  <React.Fragment key={classType}>
                                    {classFilteredArmor.map((armorItem: any) => (
                                      <ArmorCard key={armorItem.id} armor={armorItem} />
                                    ))}
                                  </React.Fragment>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
}
