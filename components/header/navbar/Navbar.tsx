"use client";
import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Code, LucideIcon, Quote } from "lucide-react";
import { Home, Star, ShoppingBag, UserPlus } from "lucide-react";
const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative ">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-foreground hover:opacity-[0.9] dark:text-foreground"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-card dark:bg-card backdrop-blur-sm rounded-2xl overflow-hidden border border-border/[0.2] dark:border-border/[0.2] shadow-xl"
              >
                <motion.div
                  layout
                  className="w-max h-full p-4 flex flex-col space-y-2"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative min-w-[99%] rounded-3xl border backdrop-blur-sm bg-[radial-gradient(#0000_2px,#003A6130_1px)] bg-[length:4px_4px] bg-repeat border-muted shadow-input flex justify-center items-center space-x-10 px-6 py-4"
    >
      {children}
    </nav>
  );
};


export const ProductItem = ({
  title,
  description,
  href,
  Icon, // Change 'icon' to 'Icon' to use it as a component
}: {
  title: string;
  description: string;
  href: string;
  Icon: LucideIcon; // Expecting a Lucide icon component
}) => {
  return (
    <Link href={href} className="flex space-x-2 items-center">
      
      <Icon className="shrink-0 text-foreground" />
      <div>
        <h4 className="text-xl font-bold mb-1 text-foreground dark:text-foreground">
          {title}
        </h4>
        <p className="text-muted text-sm max-w-[10rem] dark:text-muted-foreground">
          {description}
        </p>
      </div>
    </Link>
  );
};


export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <Link
      {...rest}
      className="text-muted dark:text-muted-foreground hover:text-primary "
    >
      {children}
    </Link>
  );
};

export default function Navbar() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <header className="flex justify-center p-4">
      <Menu setActive={setActive}>
        <div className="hidden md:flex gap-2 mr-auto">
            <Code className="h-6 w-6 text-[#00406C]"/>
            <span className="font-semibold text-xl">CodePilot</span>
        </div>
        <MenuItem setActive={setActive} active={active} item="Home">
          <ProductItem
            title="Home"
            description="Go to Home"
            href="/"
            Icon={Home}
          />
        </MenuItem>

        <MenuItem setActive={setActive} active={active} item="Sections">
          <ProductItem
            title="Features"
            description="Explore our features"
            href="#features"
            Icon={Star}
            
          />
          <Separator />
          <ProductItem
            title="Testimonials"
            description="Read what others say"
            href="#testimonials"
            Icon={Quote}
          />
          <Separator />
          <ProductItem
            title="Pricing"
            description="View our pricing plans"
            href="#pricing"
            Icon={ShoppingBag}
          />
          <Separator />
          <ProductItem
            title="Get Started"
            description="Start your journey"
            href="#get-started"
            Icon={UserPlus}
          />
        </MenuItem>

        <Link href="/sign-in">
        <button className="transition duration-100 text-foreground px-4 py-2 rounded-2xl hover:bg-secondary cursor-pointer">
          Login
        </button>
      </Link>
      </Menu>
    </header>
  );
}
