import { IChartData } from "@/@types";
import projectModel from "@/DB/models/projects.model";
import { NextResponse } from "next/server";
const baseUrl = process.env.NEXT_PUBLIC_URL;

export const fetchAllData = async () => {

  const fetchCodeReviewsData = async () => {
    const apiUrl = `${baseUrl}/api/reviews-chart`;
    try {
      const res = await fetch(apiUrl);
      if (!res.ok) {
        throw new Error("Failed to fetch Code Reviews data!")
      }
      const { codeReviewsData } = await res.json();

      return codeReviewsData as IChartData[];
    }
    catch (err) {
      console.error("Error fetching Data:", err);
      return [];
    }
  };

  const fetchUserRolesData = async () => {
    const apiUrl = `${baseUrl}/api/roles-chart`;
    try {
      const res = await fetch(apiUrl);
      if (!res.ok) {
        throw new Error("Failed to fetch Users Roles Data!")
      }
      const { userRolesData } = await res.json();

      return userRolesData as IChartData[];
    }
    catch (err) {
      console.error("Error fetching Data:", err);
      return [];
    }
  };

  const fetchUserActivityData = async () => {
    const apiUrl = `${baseUrl}/api/new-signs-chart`;
    try {
      const res = await fetch(apiUrl);
      if (!res.ok) {
        throw new Error("Failed to fetch Code Reviews data!")
      }
      const { userActivityData } = await res.json();

      return userActivityData as IChartData[];
    }
    catch (err) {
      console.error("Error fetching Data:", err);
      return [];
    }
  };

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

  const fetchTotalProject = async () => {
    const apiUrl = `${baseUrl}/api/projects`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch total projects: ${response.statusText}`);
      }
      const totalProjects = await projectModel.countDocuments();
      console.log(totalProjects);
      return  totalProjects ;
    } catch (error) {
      console.error("Error fetching total projects:", error);
      
      return 0;
    }
  };

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
  return {
    codeReviewsData,
    userRolesData,
    userActivityData,
    totalAIReviews,
    users,
    totalProject,
    recentUsers,
    activeUsers,
    totalUsers,
  }
}
