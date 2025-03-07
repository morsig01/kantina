'use client';

import { Card } from "@/components/ui/card";
import { client } from "@/sanity/lib/client";
import { getAllWeeksQuery, getWeeklyMealsQuery } from "@/lib/sanity.queries";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Meal {
  title: string;
  price: number;
  image?: any;
  allergens?: string[];
}

interface DayMeal {
  day: string;
  meal: Meal;
}

interface WeekMeals {
  meals: DayMeal[];
}

export default function WeeklyMenu() {
  const [weeks, setWeeks] = useState<number[]>([]);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [weekMeals, setWeekMeals] = useState<WeekMeals | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentDay, setCurrentDay] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  // Required distance between touchStart and touchEnd to determine swipe direction
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
    setDragOffset(0);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart || !isDragging) return;
    
    const currentTouch = e.targetTouches[0].clientX;
    const diff = touchStart - currentTouch;
    setDragOffset(diff);
  };

  const onTouchEnd = () => {
    if (!touchStart || !isDragging) return;
    
    setIsDragging(false);
    if (Math.abs(dragOffset) >= minSwipeDistance) {
      if (dragOffset > 0 && currentDay < 4) {
        setCurrentDay(prev => prev + 1);
      } else if (dragOffset < 0 && currentDay > 0) {
        setCurrentDay(prev => prev - 1);
      }
    }
    setDragOffset(0);
    setTouchStart(null);
  };

  useEffect(() => {
    const fetchWeeks = async () => {
      try {
        const weeksData = await client.fetch(getAllWeeksQuery);
        const weekNumbers = weeksData.map((w: any) => w.weekNumber);
        setWeeks(weekNumbers);
        setSelectedWeek(weekNumbers[0]);
      } catch (err) {
        setError('Failed to fetch weeks');
        console.error(err);
      }
    };
    fetchWeeks();
  }, []);

  useEffect(() => {
    if (selectedWeek) {
      const fetchMeals = async () => {
        setIsLoading(true);
        try {
          const meals = await client.fetch(getWeeklyMealsQuery, { weekNumber: selectedWeek });
          if (!meals?.meals?.length) {
            setWeekMeals(null);
            return;
          }
          setWeekMeals(meals);
        } catch (err) {
          setError('Failed to fetch meals');
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchMeals();
    }
  }, [selectedWeek]);

  const days = ["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag"];
  const shortDays = ["M", "Ti", "O", "To", "F"];

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <main className="flex flex-col gap-8 items-center min-h-screen pt-4 px-4 mb-16">
      <div className="w-full max-w-xs">
        <Select
          value={selectedWeek?.toString()}
          onValueChange={(value) => setSelectedWeek(Number(value))}
          disabled={isLoading}
        >
          <SelectTrigger>
            <SelectValue placeholder="Velg uke" />
          </SelectTrigger>
          <SelectContent>
            {weeks.map((week) => (
              <SelectItem key={week} value={week.toString()}>
                Uke {week}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-5 gap-4 w-full max-w-2xl mx-auto">
        {shortDays.map((day, index) => (
          <Card 
            key={day} 
            className={`w-16 h-16 flex items-center justify-center transition-all ${
              currentDay === index 
                ? 'ring-2 ring-primary bg-secondary' 
                : 'hover:bg-secondary'
            }`}
          >
            <h3 className="text-lg font-semibold">{day}</h3>
          </Card>
        ))}
      </div>

      <div className="w-full relative">
        <div className="w-full overflow-hidden">
          <div 
            className="flex w-[500%] touch-pan-x"
            style={{ 
              transform: `translateX(${-currentDay * 20 - (isDragging ? dragOffset / 5 : 0)}%)`,
              transition: isDragging ? 'none' : 'transform 300ms ease-in-out'
            }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {days.map((day) => {
              const dayMeal = weekMeals?.meals?.find(
                (meal: any) => meal.day === day
              );
              
              return (
                <Card 
                  key={day} 
                  className="w-full flex-shrink-0 h-[65vh] mx-auto p-6"
                  style={{ width: '20%' }}
                >
                  {dayMeal ? (
                    <div className="flex flex-col h-full">
                      {dayMeal.meal?.image?.asset?._ref ? (
                        <div className="relative w-full h-1/3 mb-4">
                          <Image
                            src={urlFor(dayMeal.meal.image).url()}
                            alt={dayMeal.meal.title || 'Meal image'}
                            fill
                            className="object-cover rounded-md"
                            priority
                          />
                        </div>
                      ) : (
                        <div className="w-full h-1/3 mb-4 bg-secondary rounded-md flex items-center justify-center">
                          <p className="text-gray-500">Ingen bilde tilgjengelig</p>
                        </div>
                      )}
                      <div className="flex flex-col flex-grow">
                        <h2 className="text-2xl font-bold mb-4">{dayMeal.meal.title}</h2>
                        <p className="text-xl font-semibold mb-4">
                          Pris: {dayMeal.meal.price}kr
                        </p>
                        {dayMeal.meal.allergens && dayMeal.meal.allergens.length > 0 && (
                          <div className="mt-auto">
                            <h3 className="font-semibold mb-2">Allergener:</h3>
                            <div className="flex flex-wrap gap-2">
                              {dayMeal.meal.allergens.map((allergen: string) => (
                                <span
                                  key={allergen}
                                  className="bg-secondary px-2 py-1 rounded-md text-sm"
                                >
                                  {allergen}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-gray-500">
                        {weekMeals ? 'Ingen måltid planlagt' : 'Laster...'}
                      </p>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
