"use client";

import Link from "next/link";
import { Calendar, Home, ShoppingBasket } from "lucide-react";
import { Button } from "@/components/ui/button";

const NavBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-around bg-white py-3 shadow-md">
      <Link href="/">
        <Button variant="ghost" className="flex flex-col items-center text-gray-600">
          <Home className="w-10 h-10" />
          <span className="text-sm">Hjem</span>
        </Button>
      </Link>
      <Link href="/ukemeny">
        <Button variant="ghost" className="flex flex-col items-center text-gray-600">
          <Calendar className="w-10 h-10" />
          <span className="text-sm">Uke</span>
        </Button>
      </Link>
      <Link href="/annet">
        <Button variant="ghost" className="flex flex-col items-center text-gray-600">
          <ShoppingBasket className="w-10 h-10" />
          <span className="text-sm">Annet</span>
        </Button>
      </Link>
    </div>
  );
};

export default NavBar;