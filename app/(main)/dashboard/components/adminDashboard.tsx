"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search, Download,
  FileText,
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectsDashboard from './projects';
import AIReviewDashboard from './aiCodeReview';
import UserManagementCard from './allUser';
import ActiveUserDisplay from './recentUser';
import UserLogs from './totalLogs';
import TotalUsers from './totalUsers';
import AdminDropdown from "./adminLogOut";
import { IUserDocument } from '@/DB/models/user.model';
import { ICountLogs } from '@/DB/models/count-logs.model';
import { IChartData } from "@/@types";
import Head from "next/head";

interface DashboardProps {
  codeReviewsData: IChartData[];
  userRolesData: IChartData[];
  userActivityData: IChartData[];
  totalAIReviews: number;
  users: IUserDocument[];
  totalProject: number;
  recentUsers: ICountLogs[];
  activeUsers: number;
  totalUsers: number;
}

const COLORS = ["#00406C", "#00A3E0", "#007B9E"];

export default function Dashboard({
  codeReviewsData,
  userRolesData,
  userActivityData,
  totalAIReviews,
  users,
  totalProject,
  recentUsers,
  activeUsers,
  totalUsers,
}: DashboardProps) {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  const handleExportCSV = () => {
    console.log("Exporting user data as CSV");
    // Create a temporary anchor element
    const link = document.createElement("a");
    // Set the href to the API endpoint that generates the CSV file
    link.href = "/api/export-csv/all-users";
    // Specify the filename for the downloaded file
    link.download = "users.csv";
    // Programmatically trigger the download
    link.click();
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClosePopup = () => {
    setSearchQuery("");
  };

  const handleExportProjectCSV=()=>{
    console.log("Exporting Project data as CSV")
    // Create a temporary anchor element
    const link = document.createElement("a");
    // Set the href to the API endpoint that generates the CSV file
    link.href = "/api/export-csv/all-projects";
    // Specify the filename for the downloaded file
    link.download = "projects.csv";
    // Programmatically trigger the download
    link.click();

}

const handleExportZoomMeetingCSV=()=> {
    console.log("Exporting meeting data as CSV")
    // Create a temporary anchor element
    const link = document.createElement("a");
    // Set the href to the API endpoint that generates the CSV file
    link.href = "/api/export-csv/all-meetings";
    // Specify the filename for the downloaded file
    link.download = "meetings.csv";
    // Programmatically trigger the download
    link.click();
}

const handleExportCodeReviewCSV =()=> {
    console.log("Exporting ExportCode data as CSV")
    // Create a temporary anchor element
    const link = document.createElement("a");
    // Set the href to the API endpoint that generates the CSV file
    link.href = "/api/export-csv/all-reviews";
    // Specify the filename for the downloaded file
    link.download = "reviews.csv";
    // Programmatically trigger the download
    link.click();
}


  return (
    <><Head>
      <title>Admin Dashboard - User Management and Analytics</title>
      <meta
        name="description"
        content="Admin Dashboard for managing users, reviewing AI code, and accessing key analytics related to the platform's performance." />
      <meta name="keywords" content="admin, dashboard, user management, analytics, AI code review, user roles" />
      <meta name="author" content="nextGenCoder" />

      {/* Open Graph Meta Tags for social media sharing */}
      <meta property="og:title" content="Admin Dashboard - User Management and Analytics" />
      <meta
        property="og:description"
        content="Access insights into user activity, manage user profiles, and analyze code reviews with the Admin Dashboard." />
      <meta property="og:image" content="/CodePilotLogo.png" />
      <meta property="og:url" content="/" />
      <meta property="og:type" content="website" />
    </Head><div className="min-h-screen bg-[#00111C] text-[#F2F2F2] relative">
        <div className="flex-1">
          <header className="sticky top-0 z-40 bg-[#001523]/95 backdrop-blur supports-[backdrop-filter]:bg-[#001523]/60 border-b border-[#002945]">
            <div className="flex h-16 items-center justify-between px-4 sm:px-6">
              <h1 className="text-xl font-semibold lg:text-2xl">Admin Dashboard</h1>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Input
                    type="search"
                    aria-label="Search users"
                    placeholder="Search users..."
                    className="w-full md:w-60 pl-9 bg-[#001A2C] border-[#002945] text-[#F2F2F2] placeholder:text-[#B3B3B3] focus:border-[#003A61] focus:ring-[#003A61]/30"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} />
                  <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#B3B3B3]" />
                </div>
                <AdminDropdown />
              </div>
            </div>
          </header>

          {searchQuery && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 flex items-center justify-center z-50"
              onClick={handleClosePopup}
            >
              <Card
                className="bg-[#001523] border-[#002945] w-full max-w-2xl max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-[#F2F2F2]">
                    Search Results
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-[#B3B3B3] hover:text-[#F2F2F2] hover:bg-[#001A2C]"
                    onClick={handleClosePopup}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <Card key={user._id} className="bg-[#001A2C] border-[#002945]">
                        <CardContent className="pt-4 text-[#F2F2F2]">
                          <p><strong>Name:</strong> {user.name}</p>
                          <p><strong>Email:</strong> {user.email}</p>
                          {user.role && <p><strong>Role:</strong> {user.role}</p>}
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <p className="text-[#B3B3B3] text-center">No users found matching "{searchQuery}".</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          <main className="p-4 sm:p-6 space-y-6">
            <Tabs defaultValue="overview" value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
              <div className="flex justify-between items-center">
                <TabsList className="bg-[#001A2C]">
                  {["overview", "users", "analytics"].map((tab) => (
                    <TabsTrigger
                      key={tab}
                      value={tab}
                      className="data-[state=active]:bg-[#00406C] data-[state=active]:text-[#F2F2F2]"
                    >
                      {tab[0].toUpperCase() + tab.slice(1)}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {selectedTab === "users" && (
                  <Button onClick={handleExportCSV} className="bg-[#00406C] hover:bg-[#003A61] text-[#F2F2F2]">
                    <Download className="mr-2 h-4 w-4" />
                    Export CSV
                  </Button>
                )}
              </div>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <motion.div
                  className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <TotalUsers totalUsers={totalUsers} />
                  <UserLogs activeUsers={activeUsers} />
                  <ProjectsDashboard totalProject={totalProject} />
                  <AIReviewDashboard totalAIReviews={totalAIReviews} />
                </motion.div>

                <motion.div
                  className="grid grid-cols-1 gap-4 lg:grid-cols-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card className="bg-[#001523] border-[#002945] lg:col-span-2">
                    <CardHeader>
                      <CardTitle>AI Code Reviews (Past Week)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={codeReviewsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#002945" />
                            <XAxis dataKey="name" stroke="#B3B3B3" tick={{ fill: "#B3B3B3" }} />
                            <YAxis stroke="#B3B3B3" tick={{ fill: "#B3B3B3" }} />
                            <Tooltip
                              contentStyle={{ backgroundColor: "#001A2C", borderColor: "#002945", color: "#F2F2F2" }}
                              labelStyle={{ color: "#F2F2F2" }} />
                            <Legend />
                            <Line type="monotone" dataKey="reviews" name="Code Reviews" stroke="#fff" activeDot={{ r: 8 }} strokeWidth={2} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-[#001523] border-[#002945]">
                    <CardHeader>
                      <CardTitle>User Roles Distribution</CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                      <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={userRolesData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#fff"
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {userRolesData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip
                              contentStyle={{ backgroundColor: "#002132", borderColor: "#00A3E0", color: "#F2F2F2", fontSize: "14px", borderRadius: "6px" }}
                              labelStyle={{ color: "#00A3E0" }}
                              itemStyle={{ color: "#F2F2F2" }} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                <ActiveUserDisplay recentUsers={recentUsers} />

              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="space-y-6">
                <motion.div className="grid grid-cols-1 gap-4 sm:grid-cols-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                  <Card className="bg-[#001523] border-[#002945]">
                    <CardHeader>
                      <CardTitle>User Activity (Past Week)</CardTitle>
                      <CardDescription className="text-[#B3B3B3]">Active users and new signups per day</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={userActivityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#002945" />
                            <XAxis dataKey="name" stroke="#B3B3B3" tick={{ fill: "#B3B3B3" }} />
                            <YAxis stroke="#B3B3B3" tick={{ fill: "#B3B3B3" }} />
                            <Tooltip contentStyle={{ backgroundColor: "#001A2C", borderColor: "#002945", color: "#F2F2F2" }} labelStyle={{ color: "#F2F2F2" }} />
                            <Legend />
                            <Bar dataKey="value" name="New Signups" fill="#ffffff" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-[#001523] border-[#002945]">
                    <CardHeader>
                      <CardTitle>User Engagement Metrics</CardTitle>
                      <CardDescription className="text-[#B3B3B3]">Detailed analytics on user engagement</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-[#B3B3B3]">Average Session Duration</span>
                            <span className="font-medium">12m 34s</span>
                          </div>
                          <div className="h-2 w-full bg-[#001A2C] rounded-full overflow-hidden">
                            <div className="h-full bg-[#00406C] rounded-full" style={{ width: "68%" }}></div>
                          </div>
                          <p className="text-xs text-[#B3B3B3]">
                            <span className="text-green-500">+8%</span> from last week
                          </p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-[#B3B3B3]">Messages per User</span>
                            <span className="font-medium">18.2</span>
                          </div>
                          <div className="h-2 w-full bg-[#001A2C] rounded-full overflow-hidden">
                            <div className="h-full bg-[#00406C] rounded-full" style={{ width: "75%" }}></div>
                          </div>
                          <p className="text-xs text-[#B3B3B3]">
                            <span className="text-green-500">+12%</span> from last week
                          </p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-[#B3B3B3]">Code Reviews per User</span>
                            <span className="font-medium">4.8</span>
                          </div>
                          <div className="h-2 w-full bg-[#001A2C] rounded-full overflow-hidden">
                            <div className="h-full bg-[#00406C] rounded-full" style={{ width: "45%" }}></div>
                          </div>
                          <p className="text-xs text-[#B3B3B3]">
                            <span className="text-green-500">+5%</span> from last week
                          </p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-[#B3B3B3]">User Retention Rate</span>
                            <span className="font-medium">82%</span>
                          </div>
                          <div className="h-2 w-full bg-[#001A2C] rounded-full overflow-hidden">
                            <div className="h-full bg-[#00406C] rounded-full" style={{ width: "82%" }}></div>
                          </div>
                          <p className="text-xs text-[#B3B3B3]">
                            <span className="text-green-500">+3%</span> from last month
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-[#001523] border-[#002945] mt-5 lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Analytics Reports</CardTitle>
                      <CardDescription className="text-[#B3B3B3]">Download detailed analytics reports</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 rounded-lg border border-[#002945] bg-[#001A2C] flex flex-col">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="font-medium">Projects Report</h3>
                              <p className="text-xs text-[#B3B3B3] mt-1">Detailed analysis of user code project</p>
                            </div>
                            <FileText className="h-5 w-5 text-[#00406C]" />
                          </div>
                          <div className="mt-auto pt-4">
                            <Button
                              onClick={handleExportProjectCSV}
                              variant="outline"
                              size="sm"
                              className="w-full border-[#002945] hover:bg-[#001A2C] hover:text-[#F2F2F2]"
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download CSV
                            </Button>
                          </div>
                        </div>

                        <div className="p-4 rounded-lg border border-[#002945] bg-[#001A2C] flex flex-col">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="font-medium">Zoom Meeting</h3>
                              <p className="text-xs text-[#B3B3B3] mt-1">Insights on meeting attendance and engagement</p>
                            </div>
                            <FileText className="h-5 w-5 text-[#00406C]" />
                          </div>
                          <div className="mt-auto pt-4">
                            <Button
                              onClick={handleExportZoomMeetingCSV}
                              variant="outline"
                              size="sm"
                              className="w-full border-[#002945] hover:bg-[#001A2C] hover:text-[#F2F2F2]"
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download CSV
                            </Button>
                          </div>
                        </div>

                        <div className="p-4 rounded-lg border border-[#002945] bg-[#001A2C] flex flex-col">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="font-medium">Code Review Analytics</h3>
                              <p className="text-xs text-[#B3B3B3] mt-1">AI code review usage statistics</p>
                            </div>
                            <FileText className="h-5 w-5 text-[#00406C]" />
                          </div>
                          <div className="mt-auto pt-4">
                            <Button
                              onClick={handleExportCodeReviewCSV}

                              variant="outline"
                              size="sm"
                              className="w-full border-[#002945] hover:bg-[#001A2C] hover:text-[#F2F2F2]"
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download CSV
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <UserManagementCard users={users} />

            </Tabs>
          </main>
        </div>
      </div></>
  );
}