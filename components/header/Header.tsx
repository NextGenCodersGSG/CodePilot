"use client";
import React, { useEffect, useState } from "react";
import DesktopNav from "./navbar/DesktopNav";
import { AlignJustify, X } from "lucide-react";
import MobileNav from "./navbar/MobileNav";

const Header = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    window.onclick = () => {
      setMenuVisible(false);
    };
  }, []);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    if (scrollTop > 70) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navStyle =
    "rounded-2xl backdrop-blur-sm bg-zinc-800/50 text-zinc-200 bg-[radial-gradient(#0000_2px,#003A6130_1px)]  bg-[length:4px_4px] bg-repeat border-none ";

  return (
    <div
    className={`flex justify-between items-center transition-all duration-300 ease-in-out p-6 md:p-4 sticky top-2 mx-auto z-30 border-b-2 ${
      scrolled ? `w-[97%] ${navStyle}` : "w-[100%]"
    }`}
    >
      <div>Code Pilot</div>
      <DesktopNav />
      <AlignJustify
        onClick={(e) => {
          e.stopPropagation();
          setMenuVisible(!isMenuVisible);
        }}
        className={`${
          !isMenuVisible ? "block" : "hidden"
        } md:hidden z-30 cursor-pointer`}
      />
      <X
        className={`${
          isMenuVisible ? "block" : "hidden"
        } md:hidden z-30 cursor-pointer`}
      />
      <MobileNav isMenuVisible={isMenuVisible} />
    </div>
  );
};

export default Header;
