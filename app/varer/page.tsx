"use client";

import { useState } from "react";
import Header from "@/components/templates/Header";
import NavBar from "@/components/templates/Navbar";
import { VareKort } from "./VareKort";

const alleVarer = [
  { navn: "Pasta", pris: "50kr,-", bilde: "/bilder/pasta.jpg" },
  { navn: "Biff i pita", pris: "50kr,-", bilde: "/bilder/biff.jpg" },
];

export default function Annet() {
  const [selectedDay, setSelectedDay] = useState<string>("");

  return (
    <>
      <Header selectedDay={selectedDay} setSelectedDay={setSelectedDay} />

      <NavBar />

      <h2 className="text-xl font-bold mb-4">Alle Varer</h2>
      <div className="grid grid-cols-2 gap-4">
        {alleVarer.map((vare) => (
          <VareKort key={vare.navn} {...vare} />
        ))}
      </div>
    </>
  );
}
