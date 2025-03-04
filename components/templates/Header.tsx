"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Calendar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { menuData } from "@/data/menuData";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const getToday = useCallback(() => {
    const weekdays = [
      "Søndag",
      "Mandag",
      "Tirsdag",
      "Onsdag",
      "Torsdag",
      "Fredag",
      "Lørdag",
    ];
    return weekdays[new Date().getDay()];
  }, []);

  const [selectedDay, setSelectedDay] = useState("Mandag");

  useEffect(() => {
    const today = getToday();
    const foundDay = menuData.find((item) => item.day === today);
    if (foundDay) setSelectedDay(today);
  }, [getToday]);

  const selectedMeal = menuData.find((item) => item.day === selectedDay);

  return (
    <div className="relative">
      {pathname === "/varer" ? (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-50">
          <div className="bg-content w-16 h-16 flex items-center justify-center rounded-full shadow-lg text-lg font-semibold text-text mb-4">
            Logo
          </div>
          <div className="w-full px-4">
            <input
              type="text"
              placeholder="Søk etter varer..."
              className="w-full rounded-xl bg-header text-text p-3 focus:outline-none"
            />
          </div>
        </div>
      ) : (
        <>
          {(pathname === "/ukemeny" || pathname === "/varer") && (
            <Button
              size="icon"
              className="absolute top-3 left-3 z-50 rounded-xl transition-transform active:scale-95 bg-header backdrop-blur-sm text-text"
              onClick={() => router.back()}
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
          )}

          {selectedMeal && (
            <>
              <img
                src={selectedMeal.img}
                alt="DagensMeny"
                className="w-full h-auto object-cover rounded-b-2xl"
              />

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    size="icon"
                    className="absolute top-3 right-3 z-50 rounded-xl transition-transform active:scale-95 bg-header backdrop-blur-sm text-text"
                  >
                    <Calendar className="w-10 h-10" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-40 p-2 mr-3 rounded-xl border-none bg-header backdrop-blur-xl text-text">
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
            </>
          )}
        </>
      )}
    </div>
  );
}
