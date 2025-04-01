// app/page.tsx
import { Suspense } from 'react'
import BadgeCover from '@/components/landing/badge-cover'
import Footer from '@/components/landing/footer'
import LandingPage from '@/components/landing/landing'
import LeftContent from '@/components/landing/left-content'
import RightContent from '@/components/landing/right-content'
import SplineLoader from '@/components/landing/spline-loader'

const Page = () => {
  throw new Error('This is a client component');
  return (
    <div>
      <LandingPage />
      <section className='relative hidden xl:block min-h-[700px] overflow-hidden bg-[#00111C]'>
        {/* Background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(#0000_2px,#00406C30_1px)] bg-[size:20px_20px] opacity-40" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#00111C] via-transparent to-[#00111C] pointer-events-none" />

        {/* Spline wrapper with Suspense */}
        <Suspense fallback={<LoadingOverlay />}>
          <div className="relative z-0">
            <SplineLoader />
          </div>
        </Suspense>

        {/* Client components */}
        <LeftContent />
        <RightContent />
        <BadgeCover />
      </section>
      <Footer />
    </div>
  )
}

// Loading component (server-rendered)
function LoadingOverlay() {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#00111C]">
      <div className="spinner animate-spin h-12 w-12 border-4 border-[#00406C] border-t-transparent rounded-full" />
    </div>
  )
}

export default Page