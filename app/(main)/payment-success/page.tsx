import PaymentSuccessPage from '@/components/payment-success/PaymentSuccess';
import Head from 'next/head'; // Import Head for adding metadata
import React, { Suspense } from 'react';

const page = () => {
  return (
    <>
      <Head>
        <title>Payment Successful - Thank You for Your Purchase</title>
        <meta
          name="description"
          content="Thank you for your payment! Your transaction was successful. Explore your order details and enjoy our services."
        />
        <meta name="keywords" content="payment success, order confirmation, transaction complete, thank you page" />
        <meta name="NextGenCoders" content="codepilot" />

        {/* Open Graph Meta Tags for social media sharing */}
        <meta property="og:title" content="Payment Successful" />
        <meta
          property="og:description"
          content="Your payment was successful! Review your purchase details and enjoy your experience with us."
        />
        <meta property="og:image" content="/CodePilotLogo.png" />
        <meta property="og:url" content="/" />
        <meta property="og:type" content="website" />
      </Head>
      
      <Suspense fallback={<div>Loading...</div>}>
        <PaymentSuccessPage />
      </Suspense>
    </>
  );
}

export default page;