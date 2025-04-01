import React, { useState } from "react";
import Encounter from "./Encounter";

interface Encounter {
  id: number;
  name: string;
  description: string;
  images: { url: string; meta: string }[];
  enemy_types: string[];
  boss: string | null;
  boss_health: number | null;
  mini_guide?: string;
}

interface EncounterSectionProps {
  encounters: Encounter[];
}

export default function EncounterSection({ encounters }: EncounterSectionProps) {
  const [expandedEncounterId, setExpandedEncounterId] = useState<number | null>(null);

  return (
    <div className="space-y-4 max-h-[85vh] overflow-y-auto hide-scrollbar">
      {encounters.map((encounter) => (
        <Encounter
          key={encounter.id}
          {...encounter}
          isExpanded={expandedEncounterId === encounter.id}
          onExpand={() =>
            setExpandedEncounterId(
              expandedEncounterId === encounter.id ? null : encounter.id
            )
          }
        />
      ))}
    </div>
  );
}