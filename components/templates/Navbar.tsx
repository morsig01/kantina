"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, ShoppingBasket, User } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [showPopup, setShowPopup] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    document.documentElement.setAttribute("data-theme", savedTheme);
    setDarkMode(savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = darkMode ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setDarkMode(!darkMode);
  };

  const links = [
    { href: "/", label: "Hjem", icon: Home },
    { href: "/ukemeny", label: "Uke", icon: Calendar },
    { href: "/varer", label: "Varer", icon: ShoppingBasket },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-navbar p-2 flex justify-around rounded-t-2xl shadow-md">
      {links.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={`flex items-center gap-2 p-2 rounded-xl hover:bg-selection transition-all ${
            pathname === href ? "bg-selection" : ""
          }`}
        >
          <Icon size={24} />
          {pathname === href && (
            <span className="text-sm text-text">{label}</span>
          )}
        </Link>
      ))}

      <button
        onClick={() => setShowPopup(!showPopup)}
        className={`flex items-center gap-2 p-2 rounded-xl hover:bg-selection transition-all ${
          showPopup ? "bg-selection" : ""
        }`}
      >
        <User size={24} />
        {showPopup && <span className="text-sm text-text">Bruker</span>}
      </button>

      {showPopup && (
        <div className="absolute bottom-16 right-4 bg-navbar p-4 rounded-2xl shadow-lg flex flex-col gap-2">
          <button className="text-text hover:bg-selection p-2 rounded-lg">
            Innstillinger
          </button>
          <button
            onClick={toggleTheme}
            className="text-text hover:bg-selection p-2 rounded-lg"
          >
            {darkMode ? "Lys modus" : "Mørk modus"}
          </button>
        </div>
      )}
    </nav>
  );
}
