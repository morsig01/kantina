"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Filter, SortAsc } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/templates/Header";
import NavBar from "@/components/templates/Navbar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const varer = [
  { name: "Taco", price: "50kr,", favorite: true, image: "/images/taco.jpg" },
  {
    name: "Hamburger",
    price: "50kr,",
    favorite: true,
    image: "/images/hamburger.jpg",
  },
  {
    name: "Pasta",
    price: "50kr,",
    favorite: false,
    image: "/images/pasta.jpg",
  },
  {
    name: "Biff i pita",
    price: "50kr,",
    favorite: false,
    image: "/images/biffipita.jpg",
  },
];

export default function VarerPage() {
  const [search, setSearch] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  const filteredVarer = varer.filter((vare) =>
    vare.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Header selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      <div className="p-4">
        <Input
          placeholder="Søk etter varer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4"
        />

        <h2 className="text-lg font-semibold mb-2">Dinne Favoriter</h2>
        <Carousel className="w-full overflow-hidden pb-2">
          <CarouselContent>
            {filteredVarer
              .filter((vare) => vare.favorite)
              .map((vare) => (
                <CarouselItem
                  key={vare.name}
                  className="basis-1/3 flex-shrink-0"
                >
                  <Card className="relative w-[160px] h-[220px] rounded-[10px] overflow-hidden">
                    <img
                      src={vare.image}
                      alt={vare.name}
                      className="w-full h-24 object-cover"
                    />
                    <CardContent className="p-2 text-center bg-gradient-to-t from-black/60 to-transparent absolute bottom-0 w-full">
                      <p className="text-sm font-medium text-white">
                        {vare.name}
                      </p>
                      <p className="text-xs text-gray-300">{vare.price}</p>
                      <Star className="absolute top-2 right-2 text-yellow-400 w-4 h-4" />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
          </CarouselContent>
        </Carousel>

        <div className="flex gap-2 my-4">
          <Button variant="outline" size="icon">
            <Filter className="w-5 h-5" />
          </Button>
          <Button variant="outline" size="icon">
            <SortAsc className="w-5 h-5" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {filteredVarer.map((vare) => (
            <Card
              key={vare.name}
              className="relative w-[160px] h-[220px] rounded-[10px] overflow-hidden"
            >
              <img
                src={vare.image}
                alt={vare.name}
                className="w-full h-32 object-cover"
              />
              <CardContent className="p-2 text-center bg-gradient-to-t from-black/60 to-transparent absolute bottom-0 w-full">
                <p className="text-sm font-medium text-white">{vare.name}</p>
                <p className="text-xs text-gray-300">{vare.price}</p>
                {vare.favorite && (
                  <Star className="absolute top-2 right-2 text-yellow-400 w-4 h-4" />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <NavBar />
    </>
  );
}
