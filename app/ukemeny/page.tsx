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

export default function Home() {
  const [weeks, setWeeks] = useState<number[]>([]);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [weekMeals, setWeekMeals] = useState<any>(null);

  useEffect(() => {
    const fetchWeeks = async () => {
      const weeksData = await client.fetch(getAllWeeksQuery);
      const weekNumbers = weeksData.map((w: any) => w.weekNumber);
      setWeeks(weekNumbers);
      setSelectedWeek(weekNumbers[0]);
    };
    fetchWeeks();
  }, []);

  useEffect(() => {
    if (selectedWeek) {
      const fetchMeals = async () => {
        try {
          const meals = await client.fetch(getWeeklyMealsQuery, { weekNumber: selectedWeek });
          console.log('Raw data from Sanity:', meals); // Debug full response
          
          if (!meals?.meals?.length) {
            console.error('No meals found for week:', selectedWeek);
            return;
          }
          
          setWeekMeals(meals);
        } catch (error) {
          console.error('Error fetching meals:', error);
        }
      };
      fetchMeals();
    }
  }, [selectedWeek]);

  const days = ["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag"];
  const shortDays = ["M", "Ti", "O", "To", "F"];

  return (
    <main className="flex flex-col items-center min-h-screen relative pt-4">
      <div className="w-full max-w-xs mb-4 px-4">
        <Select
          value={selectedWeek?.toString()}
          onValueChange={(value) => setSelectedWeek(Number(value))}
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

      <div className="grid grid-cols-5 gap-4 p-4 w-full text-center z-10">
        {shortDays.map((day, index) => (
          <Card key={day} className="p-4 transition-all hover:bg-secondary">
            <h3 className="text-lg font-semibold">{day}</h3>
          </Card>
        ))}
      </div>

      <div className="w-full overflow-x-hidden px-4 -mt-4">
        <div className="flex w-[500%] transition-transform duration-300 ease-in-out">
          {days.map((day) => {
            const dayMeal = weekMeals?.meals?.find(
              (meal: any) => meal.day === day
            );
            
            // Debug each day's meal data
            console.log(`Looking for day: ${day}`);
            console.log(`Available meals:`, weekMeals?.meals?.map((m: any) => m.day));
            console.log(`Found meal:`, dayMeal);
            
            return (
              <Card 
                key={day} 
                className="w-full flex-shrink-0 h-[80vh] mx-auto p-6"
                style={{ width: '20%' }} // Ensure each card takes exactly 1/5 of the container
              >
                {dayMeal ? (
                  <div className="flex flex-col h-full">
                    <h2 className="text-2xl font-bold mb-4">{dayMeal.meal.title}</h2>
                    {dayMeal.meal.image && (
                      <div className="relative w-full h-64 mb-4">
                        <Image
                          src={urlFor(dayMeal.meal.image).url()}
                          alt={dayMeal.meal.title}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                    )}
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
    </main>
  );
}
