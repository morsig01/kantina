"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Star,
  Filter,
  ArrowDownWideNarrow,
  ArrowUpWideNarrow,
} from "lucide-react";
import NavBar from "@/components/templates/Navbar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface Vare {
  name: string;
  price: number;
  favorite: boolean;
  image: string;
}

export default function VarerPage() {
  const [varer, setVarer] = useState<Vare[]>([]);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    async function fetchVarer() {
      const data = await client.fetch(
        `*[_type == "vare"]{
          name,
          price,
          favorite,
          "image": image.asset->url
        }`
      );
      setVarer(data);
    }
    fetchVarer();
  }, []);

  const toggleFavorite = (vare: Vare) => {
    setFavorites((prev) =>
      prev.includes(vare.name)
        ? prev.filter((fav) => fav !== vare.name)
        : [...prev, vare.name]
    );
  };

  const favoriteVarer = varer.filter((vare) => favorites.includes(vare.name));

  const filteredVarer = varer
    .filter((vare) => vare.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "price") {
        return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
      }
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });

  const toggleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <>
      <main className="p-4 mt-5 pb-24">
        {/* Logo */}

        {/* Search bar */}
        <Input
          id="searchbar"
          placeholder="Søk etter varer..."
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
          className="mb-4 h-12 px-4 bg-navbar/50 shadow-md rounded-xl placeholder:text-gray-400"
        />

        {/* Favorite Section */}
        <h2 className="text-lg font-semibold mb-2">Dine Favoritter</h2>
        {favoriteVarer.length > 0 ? (
          <Carousel className="w-full overflow-hidden pb-4">
            <CarouselContent className="gap-0.5">
              {favoriteVarer.map((vare: Vare) => (
                <CarouselItem
                  key={vare.name}
                  className="basis-[calc(50%-1rem)] h-[220px] w-[360px] flex-shrink-0"
                >
                  <Card className="relative w-full h-full aspect-[3/4] rounded-[10px] overflow-hidden">
                    <Image
                      src={vare.image}
                      alt={vare.name}
                      width={160}
                      height={160}
                      priority
                      className="absolute w-full h-full object-cover"
                    />
                    <div className="absolute m-1 p-0.5 rounded-md bg-green-600 text-white w-10 text-xs text-center">
                      <p className="text-xs">{vare.price}kr,-</p>
                    </div>
                    <CardContent className="absolute inset-x-[2px] bottom-0.5 w-[calc(100%-4px)] h-16 rounded-md bg-gradient-to-t from-black/80 to-black/20 backdrop-blur-sm px-1.5 pt-0.5">
                      <p className="text-base text-white line-clamp-2">
                        {vare.name}
                      </p>
                      <button
                        onClick={() => toggleFavorite(vare)}
                        className="absolute top-1.5 right-1.5"
                      >
                        <Star
                          className={`w-4 h-4 transition-colors duration-300 ${
                            favorites.includes(vare.name)
                              ? "text-yellow-400"
                              : "text-white"
                          }`}
                          fill={
                            favorites.includes(vare.name)
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </button>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <p className="text-gray-500 mb-4">Ingen favoritter enda.</p>
        )}

        {/* Filter buttons */}
        <div className="flex gap-2 mb-2 relative">
          <button
            className="p-2 rounded-xl bg-card shadow-md"
            onClick={() => setShowDropdown((prev: boolean) => !prev)}
          >
            <Filter className="w-6 h-6" />
          </button>

          {showDropdown && (
            <div className="absolute top-12 left-0 bg-card shadow-lg rounded-lg p-2 z-50">
              <button
                className="block w-full text-left p-2 hover:bg-selection hover:border-2 hover:p-[6px] rounded-md"
                onClick={() => {
                  setSortBy("name");
                  setShowDropdown(false);
                }}
              >
                Sorter etter navn
              </button>
              <button
                className="block w-full text-left p-2 hover:bg-selection hover:border-2 hover:p-[6px] rounded-md"
                onClick={() => {
                  setSortBy("price");
                  setShowDropdown(false);
                }}
              >
                Sorter etter pris
              </button>
            </div>
          )}

          <button
            className="p-2 rounded-xl bg-card shadow-md"
            onClick={toggleSort}
          >
            {sortOrder === "asc" ? (
              <ArrowDownWideNarrow className="w-6 h-6" />
            ) : (
              <ArrowUpWideNarrow className="w-6 h-6" />
            )}
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center w-full">
          {filteredVarer.map((vare: Vare) => (
            <Card
              key={vare.name}
              className="relative w-full max-h-[233px] max-w-[170px] aspect-[3/4] rounded-[10px] overflow-hidden"
            >
              <Image
                src={vare.image}
                alt={vare.name}
                width={170}
                height={227}
                priority
                className="absolute w-full h-full object-cover"
              />
              <div className="absolute m-1 p-1 rounded-md bg-green-600 text-white w-12 text-xs text-center">
                <p className="text-xs">{vare.price}kr,-</p>
              </div>
              <CardContent className="absolute inset-x-[2px] bottom-0.5 w-[calc(100%-4px)] h-16 rounded-md bg-gradient-to-t from-black/80 to-black/20 backdrop-blur-sm px-1.5 pt-0.5">
                <p className="text-base text-white line-clamp-2">{vare.name}</p>
                <button
                  onClick={() => toggleFavorite(vare)}
                  className="absolute top-1.5 right-1.5"
                >
                  <Star
                    className={`w-5 h-5 transition-colors duration-300 ${
                      favorites.includes(vare.name)
                        ? "text-yellow-400"
                        : "text-white"
                    }`}
                    fill={
                      favorites.includes(vare.name) ? "currentColor" : "none"
                    }
                  />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <NavBar />
    </>
  );
}
