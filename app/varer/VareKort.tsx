import { Star } from "lucide-react";

interface VareKortProps {
  navn: string;
  pris: string;
  bilde: string;
  favoritt?: boolean;
}

export const VareKort = ({ navn, pris, bilde, favoritt }: VareKortProps) => (
  <div className="relative rounded-2xl overflow-hidden shadow-lg">
    <img src={bilde} alt={navn} className="w-full h-40 object-cover" />
    <div className="absolute bottom-2 left-2 text-white">
      <h3 className="font-semibold">{navn}</h3>
      <p>{pris}</p>
    </div>
    {favoritt && (
      <Star className="absolute top-2 right-2 text-yellow-400" size={28} />
    )}
  </div>
);
