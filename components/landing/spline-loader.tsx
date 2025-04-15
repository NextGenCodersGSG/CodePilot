
import Spline from '@splinetool/react-spline/next';

export default function SplineLoader() {


  return (
    <div id="spline-container" className="w-full h-full bg-background">
        <div className="w-full h-full transition-opacity duration-500">
          <Spline
            scene="https://prod.spline.design/bwCJnoGoIoWUA1j2/scene.splinecode"
<<<<<<< HEAD
=======
            className={`w-full h-full transition-opacity duration-500 bg-muted to-accent ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => {
              console.log('Spline scene loaded')
              setIsLoaded(true)
            }}
            onError={(error) => console.error('Spline error:', error)}
>>>>>>> 2c70880cef0aef55d1f3a55a9705cbb20e0bbee7
          />
        </div>
    </div>
  )
}