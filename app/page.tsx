"use client";

import { useState } from "react";
import Header from "@/components/templates/Header";
import DagensMeny from "@/components/templates/Dagens/DagensMeny";
import Content from "@/components/templates/Content";
import NavBar from "@/components/templates/Navbar";
import { menuData } from "@/data/menuData";
import { getToday } from "@/data/dateUtils";

export default function Home() {
  const [weekMeals, setWeekMeals] = useState<any>(null);
  const [selectedDay, setSelectedDay] = useState<string>(getToday());
  const selectedMeal = menuData.find((item) => item.day === selectedDay);

  return (
    <>
      <Header
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        onWeekChange={setWeekMeals}
      />

      {selectedMeal && (
        <DagensMeny
          selectedDay={selectedMeal.day}
          setSelectedDay={setSelectedDay}
        />
      )}
      <Content />
      <NavBar />
    </>
  );
}
