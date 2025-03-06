import { Card } from "@/components/ui/card";
import { School } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <div className="w-full flex justify-center py-20">
        <School size={64} />
      </div>
      <div className="grid grid-cols-2 gap-4 p-4 mb-24 w-full">
        <Card className="col-span-2 h-48 p-6">
          <h2 className="text-2xl font-bold">Dagens Meny</h2>
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
