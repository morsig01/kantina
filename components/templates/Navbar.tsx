"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, ShoppingBasket } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Hjem", icon: Home },
    { href: "/ukemeny", label: "Uke", icon: Calendar },
    { href: "/varer", label: "Varer", icon: ShoppingBasket },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-navbar h-20 flex rounded-t-2xl shadow-md bg-neutral-300">
      {links.map(({ href, icon: Icon }, index) => (
        <Link
          key={href}
          href={href}
          className={`flex items-center justify-center flex-1 hover:bg-neutral-400 transition-all ${
            pathname === href ? "bg-neutral-400" : ""
          } ${index === 0 ? "rounded-tl-2xl" : ""} ${
            index === links.length - 1 ? "rounded-tr-2xl" : ""
          }`}
        >
          <Icon size={24} />
        </Link>
      ))}
    </nav>
  );
}