import React from "react";
import NavLink from "./nav-link/NavLink";
import { links } from "@/common/data";
import styles from "./navbar.module.css";
interface IProps {
  isMenuVisible: boolean;
}

const MobileNav = (props: IProps) => {
  return (
    <nav
      className={`${
        props.isMenuVisible
          ? "translate-x-0 opacity-1"
          : "translate-x-full opacity-0"
      } ${
        styles.beforeNav
      } transition duration-100 md:hidden flex flex-col gap-x-4 fixed -top-2.5 -right-[4vw] h-[102vh] w-[378px] bg-zinc-900/95 text-white p-4 pt-10 z-20 justify-center items-center gap-y-10`}
    >
      {links.map((link, index) => (
        <NavLink key={index} path={link.path} mobile={true}>
          {link.text}
        </NavLink>
      ))}
    </nav>
  );
};

export default MobileNav;
