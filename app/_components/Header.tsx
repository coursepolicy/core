"use client";

import { useState } from "react";

import Logo from "./Logo";
import Navigation from "./Navigation";
import BurgerMenu from "./BurgerMenu";

import NavigationAlt from "./NavigationAlt";

interface Props {}

export default function Header(props: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = (pref: boolean) => setIsMenuOpen(pref);

  return (
    <header
      className=" sticky top-0 z-10 flex h-[50px] items-center justify-between bg-blue-950 md:h-[85px]"
      {...props}
    >
      <Logo toggleMenu={toggleMenu} />
      <BurgerMenu toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
      <NavigationAlt toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
      <Navigation />
    </header>
  );
}
