"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";
import Navigation from "./Navigation";
import BurgerMenu from "./BurgerMenu";
import NavigationAlt from "./NavigationAlt";
import HGSENavigation from "../HeaderHgse/HGSENavigation";
import HGSEBurgerMenu from "../HeaderHgse/HGSEBurgerMenu";
interface Props {}

export function Header(props: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = (pref: boolean) => setIsMenuOpen(pref);
  const pathname = usePathname();
  const isHGSE = pathname.includes("hgse");
  return (
    <header
      className="sticky top-0 z-[50] flex h-[50px] items-center justify-between bg-[#252D54] lg:h-[85px]"
      {...props}
    >
      <Logo toggleMenu={toggleMenu} />
      {isHGSE ? (
        <HGSEBurgerMenu toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
      ) : (
        <BurgerMenu toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
      )}
      <NavigationAlt toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
      {isHGSE ? <HGSENavigation /> : <Navigation />}
    </header>
  );
}
