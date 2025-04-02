"use client";

import GridContainer from "./gridContainer";

export default function Home() {
  return (
    <div className="home-page flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-b from-gray-900 to-gray-800 w-full">
      <GridContainer />
    </div>
  );
}
