import dynamic from "next/dynamic";
import { fetchAllData } from "./services/dashboard.service";
import Head from "next/head";

const DynamicDashboard = dynamic(() => import("./components/adminDashboard"), {
  loading: () => <p>Loading Dashboard...</p>,

});


export default async function Page() {
  const {
    codeReviewsData,
    userRolesData,
    userActivityData,
    totalAIReviews,
    users,
    totalProject,
    recentUsers,
    activeUsers,
    totalUsers,
  } = await fetchAllData();
  
  return (
    <>
      <Head>
        <title>Admin Dashboard </title>
        <meta
          name="description"
          content="Access the admin dashboard to analyze user data, monitor user activity, view code reviews, and manage projects efficiently." />
        <meta name="keywords" content="admin dashboard, user management, data analysis, project management, AI reviews" />
        <meta name="NextGenCoders" content="codepilot" />

        {/* Open Graph Meta Tags for social media sharing */}
        <meta property="og:title" content="Admin Dashboard - Manage User Data and Insights" />
        <meta
          property="og:description"
          content="Explore user insights, code reviews, and project analytics through our comprehensive admin dashboard." />
        <meta property="og:image" content="/CodePilotLogo.png" /> {/* Replace with an actual image URL */}
        <meta property="og:url" content="/" />
        <meta property="og:type" content="website" />
      </Head>
      <DynamicDashboard
          codeReviewsData={codeReviewsData}
          userRolesData={userRolesData}
          userActivityData={userActivityData}
          totalAIReviews={totalAIReviews}
          users={users}
          totalProject={totalProject}
          recentUsers={recentUsers}
          activeUsers={activeUsers}
          totalUsers={totalUsers} 
        />
    </>
  )
}