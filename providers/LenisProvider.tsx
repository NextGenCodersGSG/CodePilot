"use client";
import { ReactLenis } from "@studio-freight/react-lenis";
import type { PropsWithChildren } from "react";

export default function LenisProvider({ children }: PropsWithChildren) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.05, // Lower value for smoother transitions (instead of using duration)   // Enable smooth scrolling on touch devices
        smoothWheel: true, // Keep smooth wheel scrolling enabled
        touchMultiplier: 1.5, // Slightly reduced from 2 for more controlled touch scrolling
        wheelMultiplier: 0.8, // Reduced from 1 for smoother wheel scrolling
        gestureOrientation: "vertical",
        syncTouch: true, // Better touch synchronization
        syncTouchLerp: 0.04, // Fine-tuned touch inertia for smoother feel
        touchInertiaMultiplier: 25 // Balanced inertia for touch devices
      }}
    >
      {children}
    </ReactLenis>
  );
}
