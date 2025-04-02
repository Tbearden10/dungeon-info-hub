import DungeonCard from "./cards/DungeonCard";
import dungeonData from "../../../dungeons_data.json";

export default function GridContainer() {
  return (
    <div className="w-full flex justify-center">
      <div
        className="grid gap-6 w-full grid-cols-1 xs:grid-cols-1 s:grid-cols: 2 md:grid-cols: 3 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5" 
        style={{
          maxWidth: "85%", // Limit the width to 80%
        }}
      >
        {dungeonData.map((dungeon: any) => (
          <DungeonCard key={dungeon.id} dungeon={dungeon} />
        ))}
      </div>
    </div>
  );
}