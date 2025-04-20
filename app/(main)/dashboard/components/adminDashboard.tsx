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
import UserMetrics from "./userMetrics";
import { redirect } from "next/navigation";
import { ToggleSwitch } from "@/components/Theme/ToggleSwitch";

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

const COLORS = ["primary", "#00A3E0", "#007B9E"];

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

  const handleExportProjectCSV = () => {
    // Create a temporary anchor element
    const link = document.createElement("a");
    // Set the href to the API endpoint that generates the CSV file
    link.href = "/api/export-csv/all-projects";
    // Specify the filename for the downloaded file
    link.download = "projects.csv";
    // Programmatically trigger the download
    link.click();

  }

  const handleExportZoomMeetingCSV = () => {
    // Create a temporary anchor element
    const link = document.createElement("a");
    // Set the href to the API endpoint that generates the CSV file
    link.href = "/api/export-csv/all-meetings";
    // Specify the filename for the downloaded file
    link.download = "meetings.csv";
    // Programmatically trigger the download
    link.click();
  }

  const handleExportCodeReviewCSV = () => {
    // Create a temporary anchor element
    const link = document.createElement("a");
    // Set the href to the API endpoint that generates the CSV file
    link.href = "/api/export-csv/all-reviews";
    // Specify the filename for the downloaded file
    link.download = "reviews.csv";
    // Programmatically trigger the download
    link.click();
  }
  const AddDeveloper = () => {
    redirect('/add-developers');
  }

  return (
    <>
      <Head>
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
      </Head>
      <div className="min-h-screen bg-background text-foreground relative">
          <div className="flex-1">
            <header className="sticky top-0 z-40 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 border-b border-accent">
              <div className="flex h-16 items-center justify-between px-4 sm:px-6">
                <h1 className="text-xl font-semibold lg:text-2xl">Admin Dashboard</h1>
                <div className="flex items-center gap-4">
                  <ToggleSwitch/>
                  <div className="relative">
                    <Input
                      type="search"
                      aria-label="Search users"
                      placeholder="Search users..."
                      className="w-full md:w-60 pl-9 bg-muted border-accent text-foreground placeholder:text-muted-foreground focus:border-secondary focus:ring-secondary/30"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)} />
                    <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                  <AdminDropdown />
                </div>
              </div>
            </header>

            {searchQuery && (
              <motion.div
                className="fixed inset-0 flex items-center justify-center z-50 bg-background/35"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  onClick={handleClosePopup}
                  className="flex items-center justify-center w-full"
                >
                  <Card
                    className="bg-card border-accent w-full max-w-2xl max-h-[80vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="text-lg font-semibold text-foreground">
                        Search Results
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-foreground hover:bg-muted"
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
                          <Card key={user._id} className="bg-muted border-accent">
                            <CardContent className="pt-4 text-foreground">
                              <p><strong>Name:</strong> {user.name}</p>
                              <p><strong>Email:</strong> {user.email}</p>
                              {user.role && <p><strong>Role:</strong> {user.role}</p>}
                            </CardContent>
                          </Card>
                        ))
                      ) : (
                        <p className="text-muted-foreground text-center">No users found matching "{searchQuery}".</p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            )}

            <main className="p-4 sm:p-6 space-y-6">
              <Tabs defaultValue="overview" value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
                <div className="flex justify-between items-center">
                  <TabsList className="bg-muted">
                    {["overview", "users", "analytics"].map((tab) => (
                      <TabsTrigger
                        key={tab}
                        value={tab}
                        className="data-[state=active]:bg-ring data-[state=active]:text-white cursor-pointer"
                      >
                        {tab[0].toUpperCase() + tab.slice(1)}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                {selectedTab === "users" ? (
                  <Button onClick={handleExportCSV} className="bg-ring hover:bg-secondary text-white cursor-pointer ">
                    <Download className="mr-2 h-4 w-4" />
                    Export CSV
                  </Button>
                ) : selectedTab === "overview" ? (
                  <Button onClick={AddDeveloper} className="bg-ring hover:bg-secondary text-white cursor-pointer ">
                    Add Developer
                  </Button>
                ) : null}
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
                    <Card className="bg-card border-accent lg:col-span-2">
                      <CardHeader>
                        <CardTitle>AI Code Reviews (Past Week)</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={codeReviewsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                              <CartesianGrid strokeDasharray="3 3" stroke="accent" />
                              <XAxis dataKey="name" stroke="muted-foreground" tick={{ fill: "muted-foreground" }} />
                              <YAxis stroke="muted-foreground" tick={{ fill: "muted-foreground" }} />
                              <Tooltip
                                contentStyle={{ backgroundColor: "muted", borderColor: "accent", color: "foreground" }}
                                labelStyle={{ color: "foreground" }} />
                              <Legend />
                              <Line type="monotone" dataKey="reviews" name="Code Reviews" stroke="#fff" activeDot={{ r: 8 }} strokeWidth={2} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-card border-accent">
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
                                contentStyle={{ backgroundColor: "#002132", borderColor: "#00A3E0", color: "foreground", fontSize: "14px", borderRadius: "6px" }}
                                labelStyle={{ color: "#00A3E0" }}
                                itemStyle={{ color: "foreground" }} />
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
                    <Card className="bg-card border-accent">
                      <CardHeader>
                        <CardTitle>User Activity (Past Week)</CardTitle>
                        <CardDescription className="text-muted-foreground">Active users and new signups per day</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={userActivityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                              <CartesianGrid strokeDasharray="3 3" stroke="accent" />
                              <XAxis dataKey="name" stroke="muted-foreground" tick={{ fill: "muted-foreground" }} />
                              <YAxis stroke="muted-foreground" tick={{ fill: "muted-foreground" }} />
                              <Tooltip contentStyle={{ backgroundColor: "muted", borderColor: "accent", color: "foreground" }} labelStyle={{ color: "foreground" }} />
                              <Legend />
                              <Bar dataKey="value" name="New Signups" fill="#ffffff" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>

                  <UserMetrics />
                  <Card className="bg-card border-accent mt-5 lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Analytics Reports</CardTitle>
                      <CardDescription className="text-muted-foreground">Download detailed analytics reports</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 rounded-lg border border-accent bg-muted flex flex-col">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="font-medium">Projects Report</h3>
                              <p className="text-xs text-muted-foreground mt-1">Detailed analysis of user code project</p>
                            </div>
                            <FileText className="h-5 w-5 text-ring" />
                          </div>
                          <div className="mt-auto pt-4">
                            <Button
                              onClick={handleExportProjectCSV}
                              variant="outline"
                              size="sm"
                              className="w-full border-accent hover:bg-muted hover:text-foreground"
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download CSV
                            </Button>
                          </div>
                        </div>

                          <div className="p-4 rounded-lg border border-accent bg-muted flex flex-col">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="font-medium">Zoom Meeting</h3>
                                <p className="text-xs text-muted-foreground mt-1">Insights on meeting attendance and engagement</p>
                              </div>
                              <FileText className="h-5 w-5 text-ring" />
                            </div>
                            <div className="mt-auto pt-4">
                              <Button
                                onClick={handleExportZoomMeetingCSV}
                                variant="outline"
                                size="sm"
                                className="w-full border-accent hover:bg-muted hover:text-foreground"
                              >
                                <Download className="mr-2 h-4 w-4" />
                                Download CSV
                              </Button>
                            </div>
                          </div>

                          <div className="p-4 rounded-lg border border-accent bg-muted flex flex-col">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="font-medium">Code Review Analytics</h3>
                                <p className="text-xs text-muted-foreground mt-1">AI code review usage statistics</p>
                              </div>
                              <FileText className="h-5 w-5 text-ring" />
                            </div>
                            <div className="mt-auto pt-4">
                              <Button
                                onClick={handleExportCodeReviewCSV}

                                variant="outline"
                                size="sm"
                                className="w-full border-accent hover:bg-muted hover:text-foreground"
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
      </div>
    </>
  );
}