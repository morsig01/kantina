"use client";

import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import Header from "@/components/templates/Header";
import DagensMeny from "@/components/templates/Dagens/DagensMeny";
import DagensContent from "@/components/templates/Dagens/DagensContent";
import NavBar from "@/components/templates/Navbar";
import { menuData } from "@/data/menuData";
import { getToday } from "@/data/dateUtils";

export default function UkeMeny() {
  const [selectedDay, setSelectedDay] = useState(getToday());
  const selectedMeal = menuData.find((item) => item.day === selectedDay);

  const handleSwipe = (direction: string) => {
    const currentIndex = menuData.findIndex((item) => item.day === selectedDay);
    let newIndex = currentIndex;

    if (direction === "LEFT") {
      newIndex = (currentIndex + 1) % menuData.length;
    } else if (direction === "RIGHT") {
      newIndex = (currentIndex - 1 + menuData.length) % menuData.length;
    }

    setSelectedDay(menuData[newIndex].day);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("LEFT"),
    onSwipedRight: () => handleSwipe("RIGHT"),
  });

  return (
    <div {...swipeHandlers} style={{ touchAction: "pan-y" }}>
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
    </div>
  );
}
