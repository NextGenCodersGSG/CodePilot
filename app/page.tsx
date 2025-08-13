import Head from "next/head"; // Import Head for adding metadata
import Footer from "@/components/landing/footer";
import LandingPage from "@/components/landing/landing";

const Page = () => {
  return (
    <div>
      <Head>
        <title>Interactive Landing Page - Elevate Your Experience</title>
        <meta
          name="description"
          content="Discover our innovative features and user-friendly design on our interactive landing page. Engage with content seamlessly while exploring our services."
        />
        <meta
          name="keywords"
          content="landing page, interactive design, services, user experience, innovative features"
        />
        <meta name="NextGenCoders" content="codePilot" />
        {/* Open Graph Meta Tags for social media sharing */}
        <meta
          property="og:title"
          content="Interactive Landing Page - Elevate Your Experience"
        />
        <meta
          property="og:description"
          content="Explore our landing page filled with interactive elements designed to enhance user experience and engagement."
        />
        <meta property="og:image" content="/CodePilotLogo.png" />{" "}
        {/* Replace with an actual image URL */}
        <meta property="og:url" content="/" />
        <meta property="og:type" content="website" />
      </Head>

      <LandingPage />
      <Footer />
    </div>
  );
};

export default Page;
