"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Calendar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import DagensMeny from "./DagensMeny";
import DagensContent from "./DagensContent";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const menuData = useMemo(
    () => [
      {
        day: "Mandag",
        img: "/images/mat.png",
        meal: "Kyllingburger",
        allergener: ["Hvetegluten", "Egg", "Melk", "Soya", "Sennep"],
        portionSize: "Medium",
        description: "Saftig kyllingburger med spr\u00f8tt br\u00f8d og friske gr\u00f8nnsaker.",
        ingredients: ["Kylling", "Burgerbr\u00f8d", "Salat", "Dressing"],
      },
      {
        day: "Tirsdag",
        img: "/images/fish-and-chips.jpg",
        meal: "Fish & Chips",
        allergener: ["Hvetegluten", "Egg", "Sennep", "Melk"],
        portionSize: "Stor",
        description: "Klassisk fish & chips med spr\u00f8 panering og pommes frites.",
        ingredients: ["Torsk", "Mel", "Egg", "Poteter", "Remulade"],
      },
      {
        day: "Onsdag",
        img: "/images/kremet-pasta-med-kylling.png",
        meal: "Pasta med kremet kyllingsaus",
        allergener: ["Hvetegluten", "Melk"],
        portionSize: "Stor",
        description: "Italiensk pasta med kremet saus og kylling.",
        ingredients: ["Pasta", "Kylling", "Fl\u00f8te", "Parmesan"],
      },
      {
        day: "Torsdag",
        img: "/images/tacobaguett.jpg",
        meal: "Tacobaguett",
        allergener: ["Hvetegluten", "Melk"],
        portionSize: "Medium",
        description: "Smakfull tacobaguett med krydret kj\u00f8ttdeig og ost.",
        ingredients: ["Baguett", "Kj\u00f8ttdeig", "Ost", "Salat"],
      },
      {
        day: "Fredag",
        img: "/images/wok.jpg",
        meal: "Wok med nudler, kylling og gr\u00f8nnsaker",
        allergener: ["Hvetegluten", "Fisk", "Egg", "Soya", "Sesam", "Skalldyr"],
        portionSize: "Stor",
        description: "Asiatisk inspirert wok med nudler, kylling og spr\u00f8 gr\u00f8nnsaker.",
        ingredients: ["Nudler", "Kylling", "Gr\u00f8nnsaker", "Soyasaus"],
      },
    ],
    []
  );

  const getToday = useCallback(() => {
    const weekdays = ["S\u00f8ndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "L\u00f8rdag"];
    return weekdays[new Date().getDay()];
  }, []);

  const [selectedDay, setSelectedDay] = useState("Mandag");

  useEffect(() => {
    const today = getToday();
    const foundDay = menuData.find((item) => item.day === today);
    if (foundDay) setSelectedDay(today);
  }, [getToday, menuData]);

  const selectedMeal = menuData.find((item) => item.day === selectedDay);

  return (
    <div className="relative">
      {(pathname === "/ukemeny" || pathname === "/annet") ? (
        <Button
          size="icon"
          className="absolute top-3 left-3 z-50 transition-transform active:scale-95 bg-content text-text"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
      ) : (
        <div className="absolute w-9 h-9 top-3 left-3 bg-content px-3 py-1 flex items-center justify-center rounded-full shadow text-sm font-semibold text-text z-50">
          Logo
        </div>
      )}

      {pathname !== "/annet" && selectedMeal && (
        <img
          src={selectedMeal.img}
          alt="DagensMeny"
          className="w-full h-auto object-cover rounded-b-2xl"
        />
      )}

      {pathname === "/annet" && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-content w-16 h-16 flex items-center justify-center rounded-full shadow-lg text-lg font-semibold text-text z-50">
          Logo
        </div>
      )}

      {pathname !== "/annet" && (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              size="icon"
              className="absolute top-3 right-3 z-50 transition-transform active:scale-95 bg-content text-text"
            >
              <Calendar className="w-10 h-10" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-40 p-2 mr-3 bg-content text-text">
            <div className="grid gap-2">
              {menuData.map((item) => (
                <Button
                  key={item.day}
                  variant="ghost"
                  className="w-full justify-start text-text"
                  onClick={() => setSelectedDay(item.day)}
                >
                  {item.day}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      )}

      <DagensMeny selectedDay={selectedDay} meal={selectedMeal?.meal || ""} />

      {pathname !== "/" && selectedMeal && (
        <DagensContent
          mealData={{
            allergener: selectedMeal.allergener,
            porsjon: selectedMeal.portionSize,
            beskrivelse: selectedMeal.description,
            ingredienser: selectedMeal.ingredients,
          }}
        />
      )}
    </div>
  );
}