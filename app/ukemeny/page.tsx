import Header from "@/components/templates/Header";
import DagensMeny from "@/components/templates/Dagens/DagensMeny";
import DagensContent from "@/components/templates/Dagens/DagensContent";
import NavBar from "@/components/templates/Navbar";
import { menuData } from "@/data/menuData";

export default function UkeMeny() {
  const today = new Date().getDay();
  const weekdays = [
    "Søndag",
    "Mandag",
    "Tirsdag",
    "Onsdag",
    "Torsdag",
    "Fredag",
    "Lørdag",
  ];
  const selectedMeal = menuData.find((item) => item.day === weekdays[today]);

  return (
    <>
      <Header />
      {selectedMeal && (
        <>
          <DagensMeny selectedDay={selectedMeal.day} meal={selectedMeal.meal} />
          <DagensContent
            mealData={{
              allergener: selectedMeal.allergener,
              porsjon: selectedMeal.portionSize,
              beskrivelse: selectedMeal.description,
              ingredienser: selectedMeal.ingredients,
            }}
          />
        </>
      )}
      <NavBar />
    </>
  );
}
