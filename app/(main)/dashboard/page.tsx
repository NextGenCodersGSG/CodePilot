"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Users,
  UserCheck,
  MessageSquare,
  FileCode,
  ChevronDown,
  Search,
  Bell,
  Download,
  MoreHorizontal,
  AlertTriangle,
  Ban,
  Trash2,
  Eye,
  UserCog,
  FileText,
} from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

// Sample data for the charts
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
  { name: "Moderator", value: 12 },
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

// Sample data for recent users
const recentUsers = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "User",
    status: "Active",
    signupDate: "2023-10-15",
    lastActive: "2023-10-21 14:32",
    loginCount: 47,
    flagged: false,
  },
  {
    id: 2,
    name: "Sarah Williams",
    email: "sarah@example.com",
    role: "Moderator",
    status: "Active",
    signupDate: "2023-10-16",
    lastActive: "2023-10-21 09:45",
    loginCount: 128,
    flagged: false,
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "michael@example.com",
    role: "User",
    status: "Suspended",
    signupDate: "2023-10-17",
    lastActive: "2023-10-20 18:12",
    loginCount: 23,
    flagged: true,
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    email: "emily@example.com",
    role: "Admin",
    status: "Active",
    signupDate: "2023-10-18",
    lastActive: "2023-10-21 11:27",
    loginCount: 215,
    flagged: false,
  },
  {
    id: 5,
    name: "David Kim",
    email: "david@example.com",
    role: "User",
    status: "Active",
    signupDate: "2023-10-19",
    lastActive: "2023-10-20 16:55",
    loginCount: 19,
    flagged: false,
  },
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
    message: "Sarah Williams has been promoted to Moderator",
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

// Colors for the pie chart
const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))"]

export default function Page() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showRoleDialog, setShowRoleDialog] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [showNotifications, setShowNotifications] = useState(false)
  const [unreadNotifications, setUnreadNotifications] = useState(notifications.filter((n) => !n.read).length)

  // Handle marking all notifications as read
  const markAllAsRead = () => {
    setUnreadNotifications(0)
  }

  // Handle user role change
  const handleRoleChange = (userId: number, newRole: string) => {
    console.log(`Changed user ${userId} role to ${newRole}`)
    // In a real app, you would update the user role in the database
  }

  // Handle user suspension
  const handleSuspendUser = (user: any) => {
    console.log(`Suspended user: ${user.name}`)
    // In a real app, you would update the user status in the database
  }

  // Handle user deletion
  const handleDeleteUser = (user: any) => {
    setSelectedUser(user)
    setShowDeleteDialog(true)
  }

  // Handle user role management
  const handleManageRole = (user: any) => {
    setSelectedUser(user)
    setShowRoleDialog(true)
  }

  // Handle CSV export
  const handleExportCSV = () => {
    console.log("Exporting user data as CSV")
    // In a real app, you would generate and download a CSV file
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
                <Card className="bg-[#001523] border-[#002945]">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-[#B3B3B3]">Total Users</CardTitle>
                    <Users className="h-4 w-4 text-[#00406C]" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2,543</div>
                    <p className="text-xs text-[#B3B3B3] mt-1">
                      <span className="text-green-500">+12%</span> from last month
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-[#001523] border-[#002945]">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-[#B3B3B3]">Active Users</CardTitle>
                    <UserCheck className="h-4 w-4 text-[#00406C]" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,128</div>
                    <p className="text-xs text-[#B3B3B3] mt-1">
                      <span className="text-green-500">+5%</span> from yesterday
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-[#001523] border-[#002945]">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-[#B3B3B3]">Total Messages</CardTitle>
                    <MessageSquare className="h-4 w-4 text-[#00406C]" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">45,872</div>
                    <p className="text-xs text-[#B3B3B3] mt-1">
                      <span className="text-green-500">+18%</span> from last week
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-[#001523] border-[#002945]">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-[#B3B3B3]">AI Code Reviews</CardTitle>
                    <FileCode className="h-4 w-4 text-[#00406C]" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12,345</div>
                    <p className="text-xs text-[#B3B3B3] mt-1">
                      <span className="text-green-500">+24%</span> from last week
                    </p>
                  </CardContent>
                </Card>
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
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#002945" />
                          <XAxis dataKey="name" stroke="#B3B3B3" tick={{ fill: "#B3B3B3" }} />
                          <YAxis stroke="#B3B3B3" tick={{ fill: "#B3B3B3" }} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#001A2C",
                              borderColor: "#002945",
                              color: "#F2F2F2",
                            }}
                            labelStyle={{ color: "#F2F2F2" }}
                          />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="reviews"
                            name="Code Reviews"
                            stroke="hsl(var(--chart-1))"
                            activeDot={{ r: 8 }}
                            strokeWidth={2}
                          />
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

              {/* Recent Users Table */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card className="bg-[#001523] border-[#002945]">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Recent User Activity</CardTitle>
                      <CardDescription className="text-[#B3B3B3]">
                        Recent users and their activity on the platform
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#002945] hover:bg-[#001A2C] hover:text-[#F2F2F2]"
                      onClick={() => setSelectedTab("users")}
                    >
                      View All Users
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-[#002945]">
                            <th className="px-4 py-3 text-left font-medium text-[#B3B3B3]">Name</th>
                            <th className="px-4 py-3 text-left font-medium text-[#B3B3B3]">Role</th>
                            <th className="px-4 py-3 text-left font-medium text-[#B3B3B3]">Status</th>
                            <th className="px-4 py-3 text-left font-medium text-[#B3B3B3]">Last Active</th>
                            <th className="px-4 py-3 text-right font-medium text-[#B3B3B3]">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentUsers.slice(0, 3).map((user) => (
                            <tr
                              key={user.id}
                              className="border-b border-[#002945] hover:bg-[#001A2C] transition-colors"
                            >
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                  <div className="h-8 w-8 rounded-full bg-[#00406C] flex items-center justify-center">
                                    <span className="font-medium text-xs">
                                      {user.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </span>
                                  </div>
                                  <div>
                                    <div className="font-medium">{user.name}</div>
                                    <div className="text-xs text-[#B3B3B3]">{user.email}</div>
                                  </div>
                                  {user.flagged && (
                                    <Badge className="bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30 ml-2">
                                      Flagged
                                    </Badge>
                                  )}
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <Badge
                                  className={cn(
                                    "font-normal",
                                    user.role === "Admin" && "bg-[#00406C] hover:bg-[#003A61]",
                                    user.role === "Moderator" && "bg-blue-600 hover:bg-blue-700",
                                    user.role === "User" && "bg-[#001A2C] hover:bg-[#002945]",
                                  )}
                                >
                                  {user.role}
                                </Badge>
                              </td>
                              <td className="px-4 py-3">
                                <Badge
                                  className={cn(
                                    "font-normal",
                                    user.status === "Active" && "bg-green-600 hover:bg-green-700",
                                    user.status === "Suspended" && "bg-red-600 hover:bg-red-700",
                                  )}
                                >
                                  {user.status}
                                </Badge>
                              </td>
                              <td className="px-4 py-3 text-[#B3B3B3]">{user.lastActive}</td>
                              <td className="px-4 py-3 text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 text-[#B3B3B3] hover:bg-[#001A2C] hover:text-[#F2F2F2]"
                                    >
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent
                                    align="end"
                                    className="bg-[#001523] border-[#002945] text-[#F2F2F2]"
                                  >
                                    <DropdownMenuItem
                                      className="hover:bg-[#001A2C] cursor-pointer"
                                      onClick={() => console.log(`View user: ${user.name}`)}
                                    >
                                      <Eye className="mr-2 h-4 w-4" />
                                      View Details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      className="hover:bg-[#001A2C] cursor-pointer"
                                      onClick={() => handleManageRole(user)}
                                    >
                                      <UserCog className="mr-2 h-4 w-4" />
                                      Manage Role
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator className="bg-[#002945]" />
                                    <DropdownMenuItem
                                      className="hover:bg-[#001A2C] cursor-pointer text-yellow-500"
                                      onClick={() => handleSuspendUser(user)}
                                    >
                                      <Ban className="mr-2 h-4 w-4" />
                                      {user.status === "Suspended" ? "Unsuspend User" : "Suspend User"}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      className="hover:bg-[#001A2C] cursor-pointer text-red-500"
                                      onClick={() => handleDeleteUser(user)}
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Delete User
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* User Management Tab */}
            <TabsContent value="users" className="space-y-6">
              <Card className="bg-[#001523] border-[#002945]">
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription className="text-[#B3B3B3]">
                    Manage user accounts, roles, and permissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1">
                      <Input
                        placeholder="Search by name or email"
                        className="bg-[#001A2C] border-[#002945] text-[#F2F2F2] placeholder:text-[#B3B3B3]"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[180px] bg-[#001A2C] border-[#002945] text-[#F2F2F2]">
                          <SelectValue placeholder="Filter by role" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#001523] border-[#002945] text-[#F2F2F2]">
                          <SelectItem value="all">All Roles</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="moderator">Moderator</SelectItem>
                          <SelectItem value="user">User</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[180px] bg-[#001A2C] border-[#002945] text-[#F2F2F2]">
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#001523] border-[#002945] text-[#F2F2F2]">
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="suspended">Suspended</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[#002945]">
                          <th className="px-4 py-3 text-left font-medium text-[#B3B3B3]">Name</th>
                          <th className="px-4 py-3 text-left font-medium text-[#B3B3B3]">Email</th>
                          <th className="px-4 py-3 text-left font-medium text-[#B3B3B3]">Role</th>
                          <th className="px-4 py-3 text-left font-medium text-[#B3B3B3]">Status</th>
                          <th className="px-4 py-3 text-left font-medium text-[#B3B3B3]">Signup Date</th>
                          <th className="px-4 py-3 text-left font-medium text-[#B3B3B3]">Last Active</th>
                          <th className="px-4 py-3 text-right font-medium text-[#B3B3B3]">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentUsers.map((user) => (
                          <tr key={user.id} className="border-b border-[#002945] hover:bg-[#001A2C] transition-colors">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-[#00406C] flex items-center justify-center">
                                  <span className="font-medium text-xs">
                                    {user.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </span>
                                </div>
                                <div>
                                  <div className="font-medium">{user.name}</div>
                                  {user.flagged && (
                                    <Badge className="bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30 mt-1">
                                      Flagged
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-[#B3B3B3]">{user.email}</td>
                            <td className="px-4 py-3">
                              <Badge
                                className={cn(
                                  "font-normal",
                                  user.role === "Admin" && "bg-[#00406C] hover:bg-[#003A61]",
                                  user.role === "Moderator" && "bg-blue-600 hover:bg-blue-700",
                                  user.role === "User" && "bg-[#001A2C] hover:bg-[#002945]",
                                )}
                              >
                                {user.role}
                              </Badge>
                            </td>
                            <td className="px-4 py-3">
                              <Badge
                                className={cn(
                                  "font-normal",
                                  user.status === "Active" && "bg-green-600 hover:bg-green-700",
                                  user.status === "Suspended" && "bg-red-600 hover:bg-red-700",
                                )}
                              >
                                {user.status}
                              </Badge>
                            </td>
                            <td className="px-4 py-3 text-[#B3B3B3]">{user.signupDate}</td>
                            <td className="px-4 py-3 text-[#B3B3B3]">{user.lastActive}</td>
                            <td className="px-4 py-3 text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-[#B3B3B3] hover:bg-[#001A2C] hover:text-[#F2F2F2]"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                  align="end"
                                  className="bg-[#001523] border-[#002945] text-[#F2F2F2]"
                                >
                                  <DropdownMenuItem
                                    className="hover:bg-[#001A2C] cursor-pointer"
                                    onClick={() => console.log(`View user: ${user.name}`)}
                                  >
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="hover:bg-[#001A2C] cursor-pointer"
                                    onClick={() => handleManageRole(user)}
                                  >
                                    <UserCog className="mr-2 h-4 w-4" />
                                    Manage Role
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator className="bg-[#002945]" />
                                  <DropdownMenuItem
                                    className="hover:bg-[#001A2C] cursor-pointer text-yellow-500"
                                    onClick={() => handleSuspendUser(user)}
                                  >
                                    <Ban className="mr-2 h-4 w-4" />
                                    {user.status === "Suspended" ? "Unsuspend User" : "Suspend User"}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="hover:bg-[#001A2C] cursor-pointer text-red-500"
                                    onClick={() => handleDeleteUser(user)}
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete User
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card className="bg-[#001523] border-[#002945]">
                  <CardHeader>
                    <CardTitle>User Activity (Past Week)</CardTitle>
                    <CardDescription className="text-[#B3B3B3]">Active users and new signups per day</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={userActivityData}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#002945" />
                          <XAxis dataKey="name" stroke="#B3B3B3" tick={{ fill: "#B3B3B3" }} />
                          <YAxis stroke="#B3B3B3" tick={{ fill: "#B3B3B3" }} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#001A2C",
                              borderColor: "#002945",
                              color: "#F2F2F2",
                            }}
                            labelStyle={{ color: "#F2F2F2" }}
                          />
                          <Legend />
                          <Bar dataKey="active" name="Active Users" fill="hsl(var(--chart-1))" />
                          <Bar dataKey="new" name="New Signups" fill="hsl(var(--chart-2))" />
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

                <Card className="bg-[#001523] border-[#002945] lg:col-span-2">
                  <CardHeader>
                    <CardTitle>User Analytics Reports</CardTitle>
                    <CardDescription className="text-[#B3B3B3]">Download detailed analytics reports</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-lg border border-[#002945] bg-[#001A2C] flex flex-col">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-medium">User Growth Report</h3>
                            <p className="text-xs text-[#B3B3B3] mt-1">Monthly user acquisition and churn</p>
                          </div>
                          <FileText className="h-5 w-5 text-[#00406C]" />
                        </div>
                        <div className="mt-auto pt-4">
                          <Button
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
                            <h3 className="font-medium">Engagement Metrics</h3>
                            <p className="text-xs text-[#B3B3B3] mt-1">User activity and interaction data</p>
                          </div>
                          <FileText className="h-5 w-5 text-[#00406C]" />
                        </div>
                        <div className="mt-auto pt-4">
                          <Button
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
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Delete User Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="bg-[#001523] border-[#002945] text-[#F2F2F2]">
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription className="text-[#B3B3B3]">
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="flex items-center gap-3 py-4">
              <div className="h-10 w-10 rounded-full bg-[#00406C] flex items-center justify-center">
                <span className="font-medium text-sm">
                  {selectedUser.name
                    .split(" ")
                    .map((n:string) => n[0])
                    .join("")}
                </span>
              </div>
              <div>
                <div className="font-medium">{selectedUser.name}</div>
                <div className="text-sm text-[#B3B3B3]">{selectedUser.email}</div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              className="border-[#002945] hover:bg-[#001A2C] hover:text-[#F2F2F2]"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                console.log(`Deleted user: ${selectedUser?.name}`)
                setShowDeleteDialog(false)
              }}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Manage Role Dialog */}
      <Dialog open={showRoleDialog} onOpenChange={setShowRoleDialog}>
        <DialogContent className="bg-[#001523] border-[#002945] text-[#F2F2F2]">
          <DialogHeader>
            <DialogTitle>Manage User Role</DialogTitle>
            <DialogDescription className="text-[#B3B3B3]">
              Change the role and permissions for this user.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#00406C] flex items-center justify-center">
                  <span className="font-medium text-sm">
                    {selectedUser.name
                      .split(" ")
                      .map((n:string) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <div className="font-medium">{selectedUser.name}</div>
                  <div className="text-sm text-[#B3B3B3]">{selectedUser.email}</div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">User Role</label>
                <Select defaultValue={selectedUser.role.toLowerCase()}>
                  <SelectTrigger className="w-full bg-[#001A2C] border-[#002945] text-[#F2F2F2]">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#001523] border-[#002945] text-[#F2F2F2]">
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="moderator">Moderator</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Permissions</label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="perm-manage-users"
                      className="rounded border-[#002945] bg-[#001A2C] text-[#00406C] focus:ring-[#00406C]"
                      defaultChecked={selectedUser.role === "Admin" || selectedUser.role === "Moderator"}
                    />
                    <label htmlFor="perm-manage-users" className="text-sm">
                      Manage Users
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="perm-view-analytics"
                      className="rounded border-[#002945] bg-[#001A2C] text-[#00406C] focus:ring-[#00406C]"
                      defaultChecked={selectedUser.role === "Admin"}
                    />
                    <label htmlFor="perm-view-analytics" className="text-sm">
                      View Analytics
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="perm-manage-content"
                      className="rounded border-[#002945] bg-[#001A2C] text-[#00406C] focus:ring-[#00406C]"
                      defaultChecked={selectedUser.role === "Admin" || selectedUser.role === "Moderator"}
                    />
                    <label htmlFor="perm-manage-content" className="text-sm">
                      Manage Content
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowRoleDialog(false)}
              className="border-[#002945] hover:bg-[#001A2C] hover:text-[#F2F2F2]"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                console.log(`Updated role for user: ${selectedUser?.name}`)
                setShowRoleDialog(false)
              }}
              className="bg-[#00406C] hover:bg-[#003A61] text-[#F2F2F2]"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

