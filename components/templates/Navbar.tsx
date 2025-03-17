"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, ShoppingBasket } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Hjem", icon: Home },
    { href: "/ukemeny", label: "Ukemeny", icon: Calendar },
    { href: "/varer", label: "Varer", icon: ShoppingBasket },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 h-20 flex rounded-t-2xl shadow-md bg-card pb-[env(safe-area-inset-bottom)]">
      {links.map(({ href, label, icon: Icon }, index) => (
        <Link
          key={href}
          href={href}
          className={`flex flex-col items-center justify-center flex-1 hover:bg-muted transition-all ${
            pathname === href ? "bg-muted" : ""
          } ${index === 0 ? "rounded-tl-2xl" : ""} ${
            index === links.length - 1 ? "rounded-tr-2xl" : ""
          }`}
        >
          <Icon size={24} />
          <span className="text-sm mt-1">{label}</span>
        </Link>
      ))}
    </nav>
  );
}