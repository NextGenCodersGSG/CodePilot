
import BadgeCover from '@/components/landing/badge-cover';
import Footer from '@/components/landing/footer';
import LandingPage from '@/components/landing/landing';
import LeftContent from '@/components/landing/left-content';
import RightContent from '@/components/landing/right-content';
import Spline from '@splinetool/react-spline/next';
import React from 'react'

const page = () => {
  return (
    <div>
      <LandingPage/>
      <section className='relative hidden xl:block min-h-[700px] overflow-hidden bg-[#00111C]'>
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(#0000_2px,#00406C30_1px)] bg-[size:20px_20px] opacity-40"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#00111C] via-transparent to-[#00111C] pointer-events-none"></div>
      
      {/* Spline scene */}
      <div className="relative z-0">
        <Spline
          scene="https://prod.spline.design/bwCJnoGoIoWUA1j2/scene.splinecode" 
        />
      </div>
      
      {/* Client components with animations */}
      <LeftContent />
      <RightContent />
      <BadgeCover />
    </section>
      <Footer/>
    </div>
  )
}

export default page
