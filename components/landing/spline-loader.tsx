'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState, Suspense } from 'react'

// Custom loading component
const SplineLoading = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="sr-only">Loading 3D model...</div>
  </div>
)

// Dynamically import with improved options
const Spline = dynamic(
  () => import('@splinetool/react-spline').then(mod => mod.default),
  { 
    ssr: false,
    loading: SplineLoading
  }
)

export default function SplineLoader() {
  const [isVisible, setIsVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Only load Spline when component is in viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Disconnect once visible to prevent unnecessary callbacks
          observer.disconnect()
        }
      },
      { threshold: 0.01 } // Trigger when at least 10% is visible
    )
    
    // Create a target element for the observer
    const target = document.getElementById('spline-container')
    if (target) observer.observe(target)
    
    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div id="spline-container" className="w-full h-full bg-background">
      {isVisible && (
        <Suspense fallback={<SplineLoading />}>
          <Spline
            scene="https://prod.spline.design/bwCJnoGoIoWUA1j2/scene.splinecode"
            className={`w-full h-full transition-opacity duration-500 bg-muted to-accent ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => {
              console.log('Spline scene loaded')
              setIsLoaded(true)
            }}
            onError={(error) => console.error('Spline error:', error)}
          />
        </Suspense>
      )}
    </div>
  )
}