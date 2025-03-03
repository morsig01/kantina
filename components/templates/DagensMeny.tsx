import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

interface DagensMenyProps {
  selectedDay: string;
  meal: string;
}

export default function DagensMeny({ selectedDay, meal }: DagensMenyProps) {
  return (
    <Link href="/ukemeny" className="block">
      <Card className="mx-4 -mt-16 z-10 relative rounded-[8vw] transition-transform active:scale-95 hover:bg-gray-100">
        <CardContent className="text-center">
          <p className="text-xl text-gray-600 p-2 -mb-1">{selectedDay}</p>
          <h2 className="text-5xl md:text-4xl lg:text-5xl font-bold text-center">
            {meal}
          </h2>
          <p className="text-xl text-gray-600 p-2 -mb-1">50kr,- </p>
        </CardContent>
      </Card>
    </Link>
  );
}
