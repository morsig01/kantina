"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Calendar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import DagensMeny from "./DagensMeny";
import DagensContent from "./DagensContent";

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();

    const menuData = useMemo(() => ({
        Mandag: {
            img: "/images/mat.png",
            meal: "Kyllingburger",
            allergener: ["Hvetegluten", "Egg", "Melk", "Soya", "Sennep"],
            portionSize: "Medium",
            description: "Saftig kyllingburger med sprøtt brød og friske grønnsaker.",
            ingredients: ["Kylling", "Burgerbrød", "Salat", "Dressing"]
        },
        Tirsdag: {
            img: "/images/fish-and-chips.jpg",
            meal: "Fish & Chips",
            allergener: ["Hvetegluten", "Egg", "Sennep", "Melk"],
            portionSize: "Stor",
            description: "Klassisk fish & chips med sprø panering og pommes frites.",
            ingredients: ["Torsk", "Mel", "Egg", "Poteter", "Remulade"]
        },
        Onsdag: {
            img: "/images/kremet-pasta-med-kylling.png",
            meal: "Pasta med kremet kyllingsaus",
            allergener: ["Hvetegluten", "Melk"],
            portionSize: "Stor",
            description: "Italiensk pasta med kremet saus og kylling.",
            ingredients: ["Pasta", "Kylling", "Fløte", "Parmesan"]
        },
        Torsdag: {
            img: "/images/tacobaguett.jpg",
            meal: "Tacobaguett",
            allergener: ["Hvetegluten", "Melk"],
            portionSize: "Medium",
            description: "Smakfull tacobaguett med krydret kjøttdeig og ost.",
            ingredients: ["Baguett", "Kjøttdeig", "Ost", "Salat"]
        },
        Fredag: {
            img: "/images/wok.jpg",
            meal: "Wok med nudler, kylling og grønnsaker",
            allergener: ["Hvetegluten", "Fisk", "Egg", "Soya", "Sesam", "Skalldyr"],
            portionSize: "Stor",
            description: "Asiatisk inspirert wok med nudler, kylling og sprø grønnsaker.",
            ingredients: ["Nudler", "Kylling", "Grønnsaker", "Soyasaus"]
        }
    }), []);

    // Finner dagens dag
    const getToday = useCallback(() => {
        const weekdays = ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"];
        const today = new Date().getDay();
        return weekdays[today] as keyof typeof menuData;
    }, []);

    const [selectedDay, setSelectedDay] = useState<keyof typeof menuData>("Mandag");

    useEffect(() => {
        const today = getToday();
        if (menuData[today]) {
            setSelectedDay(today);
        }
    }, [getToday, menuData]); // Legg til disse avhengighetene

    return (
        <div className="relative">
            {/* Viser bilde av dagens rett hvis ikke på /annet */}
            {pathname !== "/annet" && (
                <img
                    src={menuData[selectedDay].img}
                    alt="DagensMeny"
                    className="w-full h-auto object-cover rounded-b-2xl"
                />
            )}

            {/* Tilbake-knapp på /ukemeny og /annet */}
            {(pathname === "/ukemeny" || pathname === "/annet") ? (
                <Button
                    variant="outline"
                    size="icon"
                    className="absolute top-3 left-3 transition-transform active:scale-95 hover:bg-gray-100"
                    onClick={() => router.back()}
                >
                    <ArrowLeft className="w-6 h-6" />
                </Button>
            ) : (
                <div className="absolute w-9 h-9 top-3 left-3 bg-white px-3 py-1 flex items-center justify-center rounded-full shadow text-sm font-semibold">
                    Logo
                </div>
            )}

            {/* Stor logo på /annet */}
            {pathname === "/annet" && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white w-16 h-16 flex items-center justify-center rounded-full shadow-lg text-lg font-semibold">
                    Logo
                </div>
            )}

            {/* Kalender dropdown (ikke på /annet) */}
            {pathname !== "/annet" && (
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" size="icon" className="absolute top-3 right-3 transition-transform active:scale-95 hover:bg-gray-100">
                            <Calendar className="w-10 h-10" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-40 p-2 mr-3">
                        <div className="grid gap-2">
                            {Object.keys(menuData).map((day) => (
                                <Button
                                    key={day}
                                    variant="ghost"
                                    className="w-full justify-start"
                                    onClick={() => setSelectedDay(day as keyof typeof menuData)}
                                >
                                    {day}
                                </Button>
                            ))}
                        </div>
                    </PopoverContent>
                </Popover>
            )}

            {/* Send valgt dag til DagensMeny */}
            <DagensMeny selectedDay={selectedDay} meal={menuData[selectedDay].meal} />

            {/* Skjuler DagensContent på forsiden ("/") */}
            {pathname !== "/" && (
                <DagensContent
                    mealData={{
                        allergener: menuData[selectedDay].allergener,
                        porsjon: menuData[selectedDay].portionSize,
                        beskrivelse: menuData[selectedDay].description,
                        ingredienser: menuData[selectedDay].ingredients
                    }}
                />
            )}
        </div>
    );
}