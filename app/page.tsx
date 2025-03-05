"use client";

import { useState } from "react";
import Header from "@/components/templates/Header";
import DagensMeny from "@/components/templates/Dagens/DagensMeny";
import Content from "@/components/templates/Content";
import NavBar from "@/components/templates/Navbar";
import { menuData } from "@/data/menuData";
import { getToday } from "@/data/dateUtils";

export default function Home() {
  const [selectedDay, setSelectedDay] = useState<string>(getToday());
  const selectedMeal = menuData.find((item) => item.day === selectedDay);

  return (
    <>
      <Header selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      {selectedMeal && (
        <DagensMeny
          selectedDay={selectedMeal.day}
          meal={selectedMeal.meal}
          setSelectedDay={setSelectedDay}
        />
      )}
      <Content />
      <NavBar />
    </>
  );
}
