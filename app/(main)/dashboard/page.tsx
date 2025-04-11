import Dashboard from "./components/adminDashboard";
import { fetchAllData } from "./services/dashboard.service";

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
    <Dashboard
      codeReviewsData={codeReviewsData}
      userRolesData={userRolesData}
      userActivityData={userActivityData}
      totalAIReviews={totalAIReviews}
      users={users}
      totalProject={totalProject}
      recentUsers={recentUsers}
      activeUsers={activeUsers}
      totalUsers={totalUsers} />
  );
}