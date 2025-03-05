"use client";

import { useState } from "react";
import Header from "@/components/templates/Header";
import DagensMeny from "@/components/templates/Dagens/DagensMeny";
import DagensContent from "@/components/templates/Dagens/DagensContent";
import NavBar from "@/components/templates/Navbar";
import { menuData } from "@/data/menuData";
import { getToday } from "@/data/dateUtils";

export default function UkeMeny() {
  const [selectedDay, setSelectedDay] = useState(getToday());
  const selectedMeal = menuData.find((item) => item.day === selectedDay);

  return (
    <>
      <Header selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      {selectedMeal && (
        <>
          <DagensMeny selectedDay={selectedMeal.day} meal={selectedMeal.meal} />
          <DagensContent
            mealData={{
              allergener: selectedMeal.allergener,
              porsjon: selectedMeal.portionSize,
              beskrivelse: selectedMeal.description,
              ingredienser: selectedMeal.ingredients,
            }}
          />
        </>
      )}
      <NavBar />
    </>
  );
}
