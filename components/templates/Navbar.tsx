"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, ShoppingBasket, User, Sun, Moon } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [showPopup, setShowPopup] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialiser tema basert på lagret verdi eller systempreferanse
    const savedTheme =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    document.documentElement.setAttribute("data-theme", savedTheme);
    setDarkMode(savedTheme === "dark");

    // Lukk popup når man klikker utenfor
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
          className={`flex items-center gap-2 p-2 rounded-xl hover:bg-selection transition-all ${pathname === href ? "bg-selection" : ""}`}
        >
          <Icon size={24} />
          {pathname === href && (
            <span className="text-sm text-text">{label}</span>
          )}
        </Link>
      ))}

      <button
        onClick={() => setShowPopup(!showPopup)}
        className={`flex items-center gap-2 p-2 rounded-xl hover:bg-selection transition-all ${showPopup ? "bg-selection" : ""}`}
      >
        <User size={24} />
      </button>

      {showPopup && (
        <div
          ref={popupRef}
          className="absolute bottom-16 right-4 bg-navbar p-4 rounded-2xl shadow-lg flex flex-col gap-4"
        >
          <button className="text-text hover:bg-selection p-2 rounded-lg">
            Innstillinger
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg flex justify-center"
          >
            <div className="relative w-14 h-8 flex items-center bg-selection rounded-full p-1 transition-all">
              <div
                className={`absolute w-6 h-6 bg-navbar rounded-full flex items-center justify-center transition-transform duration-300 ${darkMode ? "translate-x-6" : "translate-x-0"}`}
              >
                {darkMode ? <Moon size={16} /> : <Sun size={16} />}
              </div>
            </div>
          </button>
        </div>
      )}
    </nav>
  );
}
