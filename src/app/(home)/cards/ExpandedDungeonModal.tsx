import React, { useState, useEffect } from "react";
import EncounterSection from "./encounter/EncounterSection";
import LootSection from "./loot/LootSection";
import TriumphSection from "./triumph/TriumphSection";
import ExoticWeaponSection from "./modal/ExoticWeaponSection";
import TitleSection from "./modal/TitleSection";
import SecretChestsSection from "./modal/SecretChestsSection";
import NotesSection from "./modal/NotesSection";

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
      <div className="bg-gray-900 text-white rounded-lg shadow-lg w-full max-w-7xl p-6 flex gap-6 overflow-hidden border-gray-700">
        <div className="w-1/3 flex-none flex flex-col gap-4">
          <div
            className="h-[300px] rounded-lg overflow-hidden relative bg-cover bg-center"
            style={{ backgroundImage: `url(${dungeon.image})` }}
          >
            <div className="absolute bottom-4 left-4 bg-black/50 p-2 rounded-md">
              <h2 className="text-2xl font-bold">{dungeon.name}</h2>
            </div>
          </div>

          <TitleSection title={dungeon.title} />
          <ExoticWeaponSection exoticWeapon={dungeon.exoticWeapon} />
          <SecretChestsSection secretChests={dungeon.secretChests} />
          <NotesSection notes={dungeon.notes} />
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