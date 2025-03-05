"use client";

import { usePathname, useRouter } from "next/navigation";
import { Calendar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { menuData } from "@/data/menuData";

interface HeaderProps {
  selectedDay: string;
  setSelectedDay: (day: string) => void;
}

export default function Header({ selectedDay, setSelectedDay }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const selectedMeal = menuData.find((item) => item.day === selectedDay);

  return (
    <div className="relative">
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
              <Button size="icon" className="absolute top-3 right-3">
                <Calendar className="w-10 h-10" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-2">
              <div className="grid gap-2">
                {menuData.map((item) => (
                  <Button
                    key={item.day}
                    variant="ghost"
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
    </div>
  );
}
