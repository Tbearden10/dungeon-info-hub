import React, { useState, useEffect } from "react";
import EncounterSection from "./encounter/EncounterSection";
import LootSection from "./loot/LootSection";
import TriumphSection from "./triumph/TriumphSection";
import { getDamageTypeIcon, getAmmoTypeIcon } from "@/util/imageUtil";

interface ExpandedDungeonModalProps {
  dungeon: any;
  onClose: () => void;
}

export default function ExpandedDungeonModal({ dungeon, onClose }: ExpandedDungeonModalProps) {
  const [activeTab, setActiveTab] = useState("loot");

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex justify-center items-center z-50 p-6">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md z-50"
      >
        Close
      </button>
      <div className="bg-gray-900 text-white rounded-lg shadow-lg w-full max-w-7xl p-6 flex gap-6 overflow-hidden border border-white/10">
        <div className="w-1/3 flex-none flex flex-col gap-4">
          <div
            className="h-[300px] rounded-lg overflow-hidden relative bg-cover bg-center"
            style={{ backgroundImage: `url(${dungeon.image})` }}
          >
            <div className="absolute bottom-4 left-4 bg-black/50 p-2 rounded-md">
              <h2 className="text-2xl font-bold">{dungeon.name}</h2>
            </div>
          </div>

          {dungeon.title && (
            <div className="bg-gray-800 p-4 rounded-lg flex items-center space-x-2">
              <img
                src={dungeon.title.icon}
                alt={dungeon.title.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <h3 className="text-sm font-semibold text-yellow-400">{dungeon.title.name}</h3>
            </div>
          )}

          {dungeon.exoticWeapon && (
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={dungeon.exoticWeapon.image}
                    alt={dungeon.exoticWeapon.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="text-sm font-semibold">{dungeon.exoticWeapon.name}</h3>
                    <p className="text-xs text-gray-400">{dungeon.exoticWeapon.weaponType}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <img
                    src={getDamageTypeIcon(dungeon.exoticWeapon.damageType)}
                    alt={dungeon.exoticWeapon.damageType}
                    className="w-6 h-6"
                  />
                  <img
                    src={getAmmoTypeIcon(dungeon.exoticWeapon.ammoType)}
                    alt={dungeon.exoticWeapon.ammoType}
                    className="w-6 h-6"
                  />
                </div>
              </div>
              <p className="mt-4 text-xs text-gray-300">
                <strong>Source:</strong> {dungeon.exoticWeapon.source}
              </p>
              {dungeon.exoticWeapon.exoticperks && (
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-yellow-400">Exotic Perks</h4>
                  <div className="space-y-4 mt-2">
                    {dungeon.exoticWeapon.exoticperks.map((perk: any, index: number) => (
                      <div key={index} className="flex items-start space-x-4">
                        <img
                          src={perk.image}
                          alt={perk.name}
                          className="w-8 h-8 rounded-lg object-cover"
                        />
                        <div>
                          <h5 className="text-xs font-semibold">{perk.name}</h5>
                          <p className="text-xs text-gray-300">{perk.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {dungeon.notes && (
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h4 className="text-sm font-semibold text-yellow-400">Notes</h4>
              <p className="text-xs text-gray-300 mt-2">{dungeon.notes}</p>
            </div>
          )}
        </div>

        <div className="w-2/3 flex flex-col pl-6">
          <div className="flex border-b border-gray-600 mb-4">
            {["Loot", "Encounters", "Triumphs"].map((tab) => (
              <button
                key={tab}
                className={`flex-1 py-3 text-center ${
                  activeTab === tab.toLowerCase()
                    ? "border-b-2 border-blue-400 text-blue-400"
                    : "text-gray-400"
                }`}
                onClick={() => setActiveTab(tab.toLowerCase())}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex-grow overflow-hidden">
            {activeTab === "loot" && (
              <div className="max-h-[85vh] overflow-y-auto hide-scrollbar">
                <LootSection loot={dungeon.loot} encounters={dungeon.encounters} />
              </div>
            )}
            {activeTab === "encounters" && <EncounterSection encounters={dungeon.encounters} />}
            {activeTab === "triumphs" && <TriumphSection triumphs={dungeon.triumphs} />}
          </div>
        </div>
      </div>
    </div>
  );
}