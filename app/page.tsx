import { Card } from "@/components/ui/card";
import { School } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { getWeekNumber } from "@/lib/date";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

async function getTodaysMenu() {
  const currentWeek = getWeekNumber(new Date());
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = days[new Date().getDay()];

  const query = `*[_type == "weeklyMenu" && weekNumber == ${currentWeek}][0]`;
  const weekMenu = await client.fetch(query);
  
  return weekMenu?.[today] || "Ingen meny tilgjengelig for i dag";
}

async function getTodaysDeal() {
  const currentWeek = getWeekNumber(new Date());
  const days = ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'];
  const today = days[new Date().getDay()];

  const query = `*[_type == "weekMeals" && weekNumber == ${currentWeek}][0] {
    "todaysMeal": meals[day == $today][0] {
      "meal": meal-> {
        title,
        price,
        "imageUrl": image.asset->url
      }
    }
  }`;
  
  const result = await client.fetch(query, { today });
  return result?.todaysMeal?.meal;
}

export default async function Home() {
  const [_, todaysDeal] = await Promise.all([
    getTodaysMenu(),
    getTodaysDeal()
  ]);

  return (
    <main className="flex flex-col items-center">
      <div className="w-full flex justify-center py-20">
        <School size={64} />
      </div>
      <div className="grid grid-cols-2 gap-4 p-4 mb-24 w-full">
        <Card className="col-span-2 p-6">
          <div className="flex gap-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4">Dagens Meny</h2>
              {todaysDeal ? (
                <div>
                  <h3 className="text-xl font-medium mb-2">{todaysDeal.title}</h3>
                  <span className="text-lg font-bold">{todaysDeal.price}kr</span>
                </div>
              ) : (
                <p className="text-muted-foreground">Ingen rett for i dag</p>
              )}
            </div>
            {todaysDeal?.imageUrl && (
              <div className="relative w-48 h-48">
                <Image
                  src={todaysDeal.imageUrl}
                  alt={todaysDeal.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        </Card>

        <Card className="h-40 p-4">
          <h3 className="text-xl font-semibold">Åpningstid</h3>
        </Card>

        <Card className="h-40 p-4">
          <h3 className="text-xl font-semibold">Spesielle tilbud</h3>
        </Card>
      </div>
    </main>
  );
}
