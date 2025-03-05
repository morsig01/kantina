// components/Header.tsx
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

  const showBackButton = ["/ukemeny", "/varer"].includes(pathname);
  const selectedMeal = menuData.find((item) => item.day === selectedDay);

  return (
    <header className="relative">
      {showBackButton && (
        <Button
          size="icon"
          className="absolute left-3 top-3 z-50 rounded-xl bg-header text-text backdrop-blur-sm transition-transform active:scale-95"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-7 h-7" />
        </Button>
      )}

      {selectedMeal && (
        <>
          <img
            src={selectedMeal.img}
            alt="DagensMeny"
            className="w-full h-auto rounded-b-2xl object-cover"
          />

          <Popover>
            <PopoverTrigger asChild>
              <Button
                size="icon"
                className="absolute right-3 top-3 z-50 rounded-xl bg-header text-text backdrop-blur-sm transition-transform active:scale-95"
              >
                <Calendar className="w-8 h-8" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 border-none bg-header p-2 backdrop-blur-sm">
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
    </header>
  );
}
