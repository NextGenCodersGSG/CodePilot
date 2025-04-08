"use client"
import React from 'react';
import { useState } from "react"
import { motion } from "framer-motion"
import { useEffect } from "react";
import { Users, UserCheck, MessageSquare, FileCode, ChevronDown, Search, Bell, Download, MoreHorizontal, AlertTriangle, Ban, Trash2, Eye, UserCog, FileText, } from "lucide-react"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell, } from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils";
import ProjectsDashboard from './components/projects';
import AIReviewDashboard from './components/aiCodeReview';
import UserManagementCard from './components/allUser';
import ActiveUserDisplay from './components/recentUser';
import UserLogs from './components/totalLogs';
import { IUser } from '@/@types';
import TotalUsers from './components/totalUsers';
import UserMatrics from './components/usersMatrics';


const codeReviewsData = [
  { name: "Mon", reviews: 12 },
  { name: "Tue", reviews: 19 },
  { name: "Wed", reviews: 15 },
  { name: "Thu", reviews: 27 },
  { name: "Fri", reviews: 32 },
  { name: "Sat", reviews: 24 },
  { name: "Sun", reviews: 18 },
]

const userRolesData = [
  { name: "Admin", value: 5 },
  { name: "User", value: 2526 },
]

const userActivityData = [
  { name: "Mon", active: 845, new: 32 },
  { name: "Tue", active: 932, new: 28 },
  { name: "Wed", active: 901, new: 35 },
  { name: "Thu", active: 934, new: 42 },
  { name: "Fri", active: 1290, new: 58 },
  { name: "Sat", active: 1130, new: 47 },
  { name: "Sun", active: 1020, new: 39 },
]


// Sample notifications
const notifications = [
  {
    id: 1,
    type: "flag",
    message: "User Michael Chen has been flagged for suspicious activity",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    type: "role",
    message: "Sarah Williams has been promoted to User",
    time: "5 hours ago",
    read: false,
  },
  {
    id: 3,
    type: "system",
    message: "System update scheduled for tomorrow at 2:00 AM UTC",
    time: "1 day ago",
    read: true,
  },
  {
    id: 4,
    type: "flag",
    message: "Multiple failed login attempts detected for user ID #1082",
    time: "2 days ago",
    read: true,
  },
]
export interface IUserLoginData extends Pick<IUser, 'email' | 'password'> { }
// Colors for the pie chart
const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))"]

export default function Page() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [showNotifications, setShowNotifications] = useState(false)
  const [unreadNotifications, setUnreadNotifications] = useState(notifications.filter((n) => !n.read).length)
  // Handle marking all notifications as read
  const markAllAsRead = () => {
    setUnreadNotifications(0)
  }

  // Handle CSV export
  const handleExportCSV = () => {
    console.log("Exporting user data as CSV")
            // Create a temporary anchor element
            const link = document.createElement("a");
            // Set the href to the API endpoint that generates the CSV file
            link.href = "/api/export-csv/all-users";
            // Specify the filename for the downloaded file
            link.download = "users.csv";
            // Programmatically trigger the download
            link.click();
    
    
  }

  return (
    <div className="min-h-screen bg-[#00111C] text-[#F2F2F2]">
      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-[#001523]/95 backdrop-blur supports-[backdrop-filter]:bg-[#001523]/60 border-b border-[#002945]">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold lg:text-2xl">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search users..."
                  className="w-full md:w-60 pl-9 bg-[#001A2C] border-[#002945] text-[#F2F2F2] placeholder:text-[#B3B3B3] focus:border-[#003A61] focus:ring-[#003A61]/30"
                />
                <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#B3B3B3]" />
              </div>

              {/* Notifications Dropdown */}
              <DropdownMenu open={showNotifications} onOpenChange={setShowNotifications}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative text-[#B3B3B3] hover:text-[#F2F2F2] hover:bg-[#001A2C]"
                  >
                    <Bell className="h-5 w-5" />
                    {unreadNotifications > 0 && (
                      <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-[#00406C]"></span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80 bg-[#001523] border-[#002945] text-[#F2F2F2]">
                  <DropdownMenuLabel className="flex items-center justify-between">
                    <span>Notifications</span>
                    {unreadNotifications > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={markAllAsRead}
                        className="text-xs h-7 hover:bg-[#001A2C] text-[#B3B3B3] hover:text-[#F2F2F2]"
                      >
                        Mark all as read
                      </Button>
                    )}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-[#002945]" />
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={cn(
                            "px-4 py-3 hover:bg-[#001A2C] cursor-pointer",
                            !notification.read && "border-l-2 border-[#00406C]",
                          )}
                        >
                          <div className="flex items-start gap-3">
                            {notification.type === "flag" && (
                              <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                            )}
                            {notification.type === "role" && (
                              <UserCog className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                            )}
                            {notification.type === "system" && (
                              <Bell className="h-5 w-5 text-[#00406C] flex-shrink-0 mt-0.5" />
                            )}
                            <div>
                              <p
                                className={cn(
                                  "text-sm",
                                  !notification.read ? "text-[#F2F2F2] font-medium" : "text-[#B3B3B3]",
                                )}
                              >
                                {notification.message}
                              </p>
                              <p className="text-xs text-[#B3B3B3] mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-6 text-center text-[#B3B3B3]">
                        <p>No notifications</p>
                      </div>
                    )}
                  </div>
                  <DropdownMenuSeparator className="bg-[#002945]" />
                  <div className="p-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-[#002945] hover:bg-[#001A2C] hover:text-[#F2F2F2]"
                    >
                      View all notifications
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-[#00406C] flex items-center justify-center">
                  <span className="font-medium text-sm">AJ</span>
                </div>
                <span className="hidden md:inline-block">Admin User</span>
                <ChevronDown className="h-4 w-4 text-[#B3B3B3]" />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4 sm:p-6 space-y-6">
          {/* Tabs */}
          <Tabs defaultValue="overview" value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
            <div className="flex justify-between items-center">
              <TabsList className="bg-[#001A2C]">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-[#00406C] data-[state=active]:text-[#F2F2F2]"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="users"
                  className="data-[state=active]:bg-[#00406C] data-[state=active]:text-[#F2F2F2]"
                >
                  User Management
                </TabsTrigger>
                <TabsTrigger
                  value="analytics"
                  className="data-[state=active]:bg-[#00406C] data-[state=active]:text-[#F2F2F2]"
                >
                  Analytics
                </TabsTrigger>
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
              {/* Stats Cards */}
              <motion.div
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <TotalUsers />
                <UserLogs />
                <ProjectsDashboard />
                <AIReviewDashboard />
              </motion.div>

              {/* Chart Section */}
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
                        <LineChart
                          data={codeReviewsData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#002945" />
                          <XAxis dataKey="name" stroke="#B3B3B3" tick={{ fill: "#B3B3B3" }} />
                          <YAxis stroke="#B3B3B3" tick={{ fill: "#B3B3B3" }} />
                          <Tooltip contentStyle={{ backgroundColor: "#001A2C", borderColor: "#002945", color: "#F2F2F2" }} />
                          <Legend />
                          <Line type="monotone" dataKey="reviews" name="Code Reviews" stroke="hsl(var(--chart-1))" activeDot={{ r: 8 }} strokeWidth={2} />
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
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {userRolesData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#001A2C",
                              borderColor: "#002945",
                              color: "#F2F2F2",
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recent Users Display */}
              <ActiveUserDisplay />
            </TabsContent>

            {/* User Management Tab */}
            <TabsContent value="users" className="space-y-6">
              <UserManagementCard />
            </TabsContent>

            <TabsContent value="analytics" className="flex w-full h-full">
              <div className="w-full h-full"> 
                <UserMatrics />
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div >
  )
}

