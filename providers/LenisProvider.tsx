"use client";
import { ReactLenis } from "@studio-freight/react-lenis";

interface LenisProviderProps {
  children: React.ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1, // Increased for more responsive scrolling
        duration: 1.2, // Shorter duration for less delay
        smoothWheel: true,
        touchMultiplier: 2, // Standard value for touch devices
        wheelMultiplier: 1, // Standard value for better responsiveness
        gestureOrientation: "vertical",
        infinite: false,
        touchInertiaMultiplier: 35 // Increased for better touch feel
      }}
    >
      {/* @ts-expect-error TypeScript version mismatch between project and library */}
      {children}
    </ReactLenis>
  );
}
