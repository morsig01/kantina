import { Card } from "@/components/ui/card";
import { School } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { getWeekNumber } from "@/lib/date";
import Image from "next/image";

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
    },
    "specialMeal": specialMeal-> {
      title,
      price,
      "imageUrl": image.asset->url
    }
  }`;
  
  const result = await client.fetch(query, { today });
  return { 
    todaysMeal: result?.todaysMeal?.meal,
    specialMeal: result?.specialMeal 
  };
}

function isCanteenOpen() {
  const now = new Date();
  const day = now.getDay();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTime = hours * 60 + minutes;

  // Return false for weekend (Saturday = 6, Sunday = 0)
  if (day === 0 || day === 6) return false;

  const openTime = 9 * 60 + 30; // 09:30
  const closeTime = day === 5 ? 13 * 60 : 14 * 60; // 13:00 on Friday, 14:00 other days

  return currentTime >= openTime && currentTime < closeTime;
}

export default async function Home() {
  const { todaysMeal, specialMeal } = await getTodaysDeal();
  const isOpen = isCanteenOpen();

  return (
    <main className="flex flex-col min-h-screen pb-16">
      <div className="flex-1 flex flex-col w-full">
        <div className="flex-1 flex items-center justify-center">
          <School size={64} />
        </div>
        
        <div className="flex-1 grid grid-cols-2 gap-4 p-4 w-full">
          <Card className="col-span-2 p-6">
            <div className="flex gap-6">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-4">Dagens Meny</h2>
                {todaysMeal ? (
                  <div>
                    <h3 className="text-xl font-medium mb-2">{todaysMeal.title}</h3>
                    <span className="text-lg font-bold">{todaysMeal.price}kr</span>
                  </div>
                ) : (
                  <p className="text-muted-foreground">Ingen rett for i dag</p>
                )}
              </div>
              {todaysMeal?.imageUrl && (
                <div className="relative w-48 h-48">
                  <Image
                    src={todaysMeal.imageUrl}
                    alt={todaysMeal.title}
                    fill
                    sizes="12rem"
                    priority
                    className="object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          </Card>

          <Card className="h-40 p-4">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Åpningstid</h3>
              <div className="flex items-center gap-2">
                <div className={`relative w-3 h-3 ${isOpen ? 'bg-green-400' : 'bg-red-500'} rounded-full animate-[pulse_2s_ease-in-out_infinite]
                  before:absolute before:inset-0 before:rounded-full before:shadow-[0_0_6px] 
                  ${isOpen ? 'before:shadow-green-400/90' : 'before:shadow-red-500/90'}`} 
                />
                <span>{isOpen ? 'Åpent' : 'Stengt'}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Mandag-Torsdag: 09:30-14:00</p>
                <p>Fredag: 09:30-13:00</p>
              </div>
            </div>
          </Card>

          <Card className="h-40 p-4"> {/* Increased height from h-40 to h-52 */}
            <h3 className="text-xl font-semibold">Ukens Spesial</h3>
            {specialMeal ? (
              <div className="mt-2 flex gap-4">
                <div className="flex-1">
                  <h4 className="font-medium">{specialMeal.title}</h4>
                  <span className="text-lg font-bold">{specialMeal.price}kr</span>
                </div>
                {specialMeal.imageUrl && (
                  <div className="relative w-24 h-24">
                    <Image
                      src={specialMeal.imageUrl}
                      alt={specialMeal.title}
                      fill
                      sizes="6rem"
                      className="object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground mt-2">Ingen spesialrett denne uken</p>
            )}
          </Card>

        </div>

        <div className="flex-1" />
      </div>
    </main>
  );
}