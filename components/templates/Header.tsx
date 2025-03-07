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
import { useEffect, useState } from "react";
import { fetchWeeks, fetchWeekContent } from "@/sanity/lib/client";

interface HeaderProps {
  selectedDay: string;
  setSelectedDay: (day: string) => void;
  onWeekChange?: (weekData: any) => void;
}

export default function Header({
  selectedDay,
  setSelectedDay,
  onWeekChange,
}: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();

  const showBackButton = ["/ukemeny", "/varer"].includes(pathname);

  const getCurrentWeek = () => {
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), 0, 1);
    const days = Math.floor(
      (currentDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)
    );
    return Math.ceil(days / 7);
  };

  const [weeks, setWeeks] = useState<number[]>([]);
  const [selectedWeek, setSelectedWeek] = useState<number>(getCurrentWeek());
  const [weekMeals, setWeekMeals] = useState<any>(null);

  useEffect(() => {
    const getWeeks = async () => {
      const weeksData = await fetchWeeks();
      if (weeksData) {
        setWeeks(weeksData);
      }
    };
    getWeeks();
  }, []);

  const fetchContentForWeek = async (week: number) => {
    const content = await fetchWeekContent(week);
    // Determine which content to use based on the current day
    const isWeekend = ["Saturday", "Sunday"].includes(selectedDay);
    const mealContent = isWeekend ? content.weekendMeals : content.weekMeals;

    setWeekMeals(mealContent);
    if (onWeekChange) {
      onWeekChange(mealContent);
    }
  };

  useEffect(() => {
    const updateContentForWeek = async (week: number) => {
      await fetchContentForWeek(week);
    };
    updateContentForWeek(selectedWeek);
  }, [selectedWeek, selectedDay, onWeekChange]);

  return (
    <header className="relative z">
      {showBackButton && (
        <Button
          size="icon"
          className="absolute left-3 top-3 z-50 rounded-xl bg-header text-text backdrop-blur-sm transition-transform active:scale-95"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-7 h-7" />
        </Button>
      )}

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

      <Popover>
        <PopoverTrigger asChild>
          <Button
            size="icon"
            className="absolute right-16 top-3 z-50 w-24 h-10 rounded-xl bg-header text-text backdrop-blur-sm transition-transform active:scale-95 flex flex-col items-center justify-center"
          >
            <span className="text-[20px]">Uke {selectedWeek}</span>
            <span className="text-[14px]">{selectedDay}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-40 border-none bg-header p-2 ackdrop-blur-sm">
          <div className="grid gap-2">
            {weeks.map((week) => (
              <Button
                key={week}
                variant="ghost"
                onClick={async () => {
                  setSelectedWeek(week);
                  await fetchContentForWeek(week);
                }}
              >
                Uke {week}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </header>
  );
}
