import Dashboard from "./components/adminDashboard";
const baseUrl = process.env.NEXT_PUBLIC_URL;

// Fetch code reviews data
const fetchCodeReviewsData = async () => {
  return [
    { name: "Mon", reviews: 12 },
    { name: "Tue", reviews: 19 },
    { name: "Wed", reviews: 15 },
    { name: "Thu", reviews: 27 },
    { name: "Fri", reviews: 32 },
    { name: "Sat", reviews: 24 },
    { name: "Sun", reviews: 18 },
  ];
};

// Fetch user roles data
const fetchUserRolesData = async () => {
  return [
    { name: "Admin", value: 5 },
    { name: "User", value: 2526 },
  ];
};

// Fetch user activity data
const fetchUserActivityData = async () => {
  return [
    { name: "Mon", active: 845, new: 32 },
    { name: "Tue", active: 932, new: 28 },
    { name: "Wed", active: 901, new: 35 },
    { name: "Thu", active: 934, new: 42 },
    { name: "Fri", active: 1290, new: 58 },
    { name: "Sat", active: 1130, new: 47 },
    { name: "Sun", active: 1020, new: 39 },
  ];
};


// Fetch total AI reviews data
const fetchTotalAIReviews = async () => {
  const apiUrl = `${baseUrl}/api/reviews`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch total AI reviews: ${response.statusText}`);
    }
    const data = await response.json();
    console.log("Total AI Reviews:", data.totalAIReviews);
    return data.totalAIReviews || 0;
  } catch (error) {
    console.error("Error fetching total AI reviews:", error);
    return 0;
  }
};

// Fetch all users data
const fetchUsers = async () => {
  const apiUrl = `${baseUrl}/api/all-user`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.statusText}`);
    }
    const data = await response.json();
    console.log("Fetched Users:", data);
    return data || [];
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

// Fetch total projects data
const fetchTotalProject = async () => {
  const apiUrl = `${baseUrl}/api/projects`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch total projects: ${response.statusText}`);
    }
    const data = await response.json();
    console.log("Full API Response:", data);
    console.log("Total Projects:", data.totalAIReviews);
    return data.totalAIReviews || 0; // Adjust to data.totalProjects if API changes
  } catch (error) {
    console.error("Error fetching total projects:", error);
    return 0;
  }
};

// Fetch recent users data
const fetchRecentUsers = async () => {
  const apiUrl = `${baseUrl}/api/recent-user`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch recent users: ${response.statusText}`);
    }
    const data = await response.json();
    console.log("Recent Users:", data.recentUsers);
    return data.recentUsers || [];
  } catch (error) {
    console.error("Error fetching recent users:", error);
    return [];

  }
}
// Fetch active users data
const fetchUserLogs = async () => {
  const apiUrl = `${baseUrl}/api/logs`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch user logs: ${response.statusText}`);
    }
    const data = await response.json();
    console.log("Fetched User Logs:", data);
    return data.activeUsers || 0;
  } catch (error) {
    console.error("Error fetching user logs:", error);
    return 0;
  }
};

// Fetch total users data
const fetchTotalUsers = async () => {
  const apiUrl = `${baseUrl}/api/users/total`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch total users: ${response.statusText}`);
    }
    const data = await response.json();
    console.log("Fetched Total Users:", data);
    return data.total || 0;
  } catch (error) {
    console.error("Error fetching total users:", error);
    return 0;
  }
};

export default async function Page() {
  const [
    codeReviewsData,
    userRolesData,
    userActivityData,
    totalAIReviews,
    users,
    totalProject,
    recentUsers,
    activeUsers,
    totalUsers,
  ] = await Promise.all([
    fetchCodeReviewsData(),
    fetchUserRolesData(),
    fetchUserActivityData(),
    fetchTotalAIReviews(),
    fetchUsers(),
    fetchTotalProject(),
    fetchRecentUsers(),
    fetchUserLogs(),
    fetchTotalUsers(),
  ]);

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