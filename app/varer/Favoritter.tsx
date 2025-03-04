import { VareKort } from "./VareKort";

const favorittVarer = [
  { navn: "Taco", pris: "50kr,-", bilde: "/bilder/taco.jpg", favoritt: true },
  {
    navn: "Hamburger",
    pris: "50kr,-",
    bilde: "/bilder/burger.jpg",
    favoritt: true,
  },
];

export const Favoritter = () => (
  <section>
    <h2 className="text-xl font-bold mb-4">Dine Favoritter</h2>
    <div className="grid grid-cols-2 gap-4">
      {favorittVarer.map((vare) => (
        <VareKort key={vare.navn} {...vare} />
      ))}
    </div>
  </section>
);
