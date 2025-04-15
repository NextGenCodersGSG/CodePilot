
import Spline from '@splinetool/react-spline/next';

export default function SplineLoader() {


  return (
    <div id="spline-container" className="w-full h-full bg-background">
        <div className="w-full h-full transition-opacity duration-500">
          <Spline
            scene="https://prod.spline.design/bwCJnoGoIoWUA1j2/scene.splinecode"
          />
        </div>
    </div>
  )
}