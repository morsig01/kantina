// components/DagensMeny.tsx
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { menuData } from "@/data/menuData";

interface DagensMenyProps {
  selectedDay: string;
  meal: string;
  setSelectedDay: (day: string) => void;
}

export default function DagensMeny({
  selectedDay,
  meal,
  setSelectedDay,
}: DagensMenyProps) {
  const selectedMeal = menuData.find((item) => item.day === selectedDay);

  return (
    <Link
      href="/ukemeny"
      className="block"
      onClick={() => setSelectedDay(selectedDay)}
    >
      {selectedMeal && (
        <img
          src={selectedMeal.img}
          alt="DagensMeny"
          className="w-full h-auto rounded-b-2xl object-cover"
        />
      )}

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
            {meal}
          </h2>
          <p
            className="text-xl p-2 -mb-1"
            style={{ color: "var(--dot-selected)" }}
          >
            50kr,-
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
