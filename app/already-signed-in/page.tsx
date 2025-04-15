import React from 'react'
import AlreadySignedIn from '../already-signed-in'
import Head from 'next/head'

const page = () => {
  return (
    <><Head>
      <title>Already Signed In - Access Your Account</title>
      <meta
        name="description"
        content="You are already signed in. Access your dashboard to manage your settings, view your profile, and more." />
      <meta name="keywords" content="already signed in, user account, profile, user dashboard" />
      <meta name="NextGenCoders" content="codepilot" />

      {/* Open Graph Meta Tags for social media sharing */}
      <meta property="og:title" content="Already Signed In - Access Your Account" />
      <meta
        property="og:description"
        content="You are currently logged in. Access your account features and settings." />
      <meta property="og:image" content="/CodePilotLogo.png" /> 
      <meta property="og:url" content="" />
      <meta property="og:type" content="website" />

    </Head><AlreadySignedIn /></>
  )
}

export default page
