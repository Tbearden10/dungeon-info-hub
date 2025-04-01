"use client";

import DungeonCard from "./cards/DungeonCard";
import dungeonData from "../../../dungeons_data.json";

export default function Home() {
  return (
    <div className="home-page flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-b from-gray-900 to-gray-800">
      <div
        className="grid gap-6 w-full max-w-7xl"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          placeItems: "center", // Ensures grid items are centered
        }}
      >
        {/* Directly map over the dungeon array */}
        {dungeonData.map((dungeon: any) => (
          <DungeonCard key={dungeon.id} dungeon={dungeon} />
        ))}
      </div>
    </div>
  );
}