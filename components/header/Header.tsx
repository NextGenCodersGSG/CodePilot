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
    "bg-zinc-800/50 text-zinc-200 bg-[radial-gradient(#0000_2px,#3b301e7f_1px)]  bg-[length:4px_4px] bg-repeat";

  return (
    <div
      className={`flex backdrop-blur-sm justify-between items-center transition-all duration-200 p-4 fixed top-2 w-[94%] mx-[3%] z-30 rounded-2xl  ${
        scrolled ? navStyle : null
      }`}
    >
      <div>Quick News</div>
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
