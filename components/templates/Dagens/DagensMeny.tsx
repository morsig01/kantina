// components/DagensMeny.tsx
import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { client as sanityClient } from "@/sanity/lib/client";

interface DagensMenyProps {
  selectedDay: string;
  setSelectedDay: (day: string) => void;
}

interface MealData {
  meal: string;
  image: string;
  price: string;
}

export default function DagensMeny({
  selectedDay,
  setSelectedDay,
}: DagensMenyProps) {
  const [mealData, setMealData] = useState<MealData | null>(null);

  useEffect(() => {
    const getMealData = async () => {
      try {
        const query = `*[_type == "weekMeals"][0] {
          "meal": meals[day == $selectedDay][0].meal->title,
          "image": meals[day == $selectedDay][0].meal->image.asset->url,
          "price": meals[day == $selectedDay][0].meal->price
        }`;

        console.log("Fetching for day:", selectedDay);
        const data = await sanityClient.fetch(query, { selectedDay });
        console.log("Sanity response:", data);
        if (data) {
          setMealData({
            ...data,
            price: data.price ? `${data.price}kr,-` : "50kr,-", // Fallback price if none set
          });
        }
      } catch (error) {
        console.error("Error fetching from Sanity:", error);
      }
    };

    getMealData();
  }, [selectedDay]);

  if (!mealData) return <p>Ingen meny funnet for denne dagen...</p>;

  return (
    <div className="flex justify-center">
      <Link
        href="/ukemeny"
        className="block w-full max-w-[400px]"
        onClick={() => setSelectedDay(selectedDay)}
      >
        <div className="relative w-full">
          <img
            src={mealData.image}
            alt="DagensMeny"
            className="w-full h-[292px] rounded-b-2xl object-cover"
          />

          <Card
            className="mx-4 -mt-16 z-10 relative rounded-[8vw] transition-transform active:scale-95"
            style={{
              backgroundColor: "var(--content)",
              color: "var(--text)",
              border: "none",
            }}
          >
            <CardContent className="text-center">
              <p
                className="text-xl p-2 -mb-1"
                style={{ color: "var(--dot-selected)" }}
              >
                {selectedDay}
              </p>
              <h2 className="text-5xl md:text-4xl lg:text-5xl font-bold text-center">
                {mealData.meal}
              </h2>
              <p
                className="text-xl p-2 -mb-1"
                style={{ color: "var(--dot-selected)" }}
              >
                {mealData.price}
              </p>
            </CardContent>
          </Card>
        </div>
      </Link>
    </div>
  );
}
