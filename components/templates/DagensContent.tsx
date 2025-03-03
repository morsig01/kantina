"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useState, useEffect, useCallback } from "react";

interface MealData {
  allergener: string[];
  porsjon: string;
  beskrivelse: string;
  ingredienser: string[];
}

interface DagensContentProps {
  mealData: MealData;
}

export default function DagensContent({ mealData }: DagensContentProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    containScroll: "trimSnaps",
  });

  const updateIndex = useCallback(() => {
    if (emblaApi) {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    }
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", updateIndex);
    updateIndex();

    return () => {
      emblaApi.off("select", updateIndex);
    };
  }, [emblaApi, updateIndex]);

  const scrollTo = (index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  };

  const items = [
    {
      title: "Allergener:",
      content: mealData?.allergener || [],
      extraTitle: "Porsjonstørrelse:",
      extraContent: mealData?.porsjon || "Ukjent",
    },
    {
      title: "Beskrivelse",
      content: [mealData?.beskrivelse || "Ingen beskrivelse tilgjengelig"],
    },
    {
      title: "Ingredienser",
      content: mealData?.ingredienser || [],
    },
  ];

  return (
    <div
      ref={emblaRef}
      className="mx-4 m-4 h-66 relative rounded-[8vw] transition-transform active:scale-95"
    >
      <Carousel plugins={[Autoplay({ delay: 10000 })]}>
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem key={index} className="text-left">
              <Card
                className="p-6 h-72 rounded-[8vw] shadow-none"
                style={{
                  backgroundColor: "var(--content)",
                  color: "var(--text)",
                  border: "none",
                }}
              >
                <CardContent className="flex flex-col items-start space-y-2">
                  <h2 className="text-xl font-bold">{item.title}</h2>
                  {item.title === "Ingredienser" ? (
                    <p style={{ color: "var(--text)" }}>
                      {item.content.join(", ")}
                    </p>
                  ) : (
                    item.content.map((line, i) => (
                      <p key={i} style={{ color: "var(--text)" }}>
                        {line}
                      </p>
                    ))
                  )}
                  {item.extraTitle && (
                    <>
                      <h2 className="text-xl font-bold">{item.extraTitle}</h2>
                      <p style={{ color: "var(--dot-selected)" }}>
                        {item.extraContent}
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            className="h-2 w-2 rounded-full transition-all"
            style={{
              backgroundColor:
                index === selectedIndex
                  ? "var(--dot-selected)"
                  : "var(--dot)",
              width: index === selectedIndex ? "1rem" : "0.5rem",
            }}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}