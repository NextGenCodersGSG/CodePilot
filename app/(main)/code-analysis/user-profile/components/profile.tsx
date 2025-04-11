"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  CreditCard,
  CheckCircle,
  Edit,
  Save,
  X,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { PasswordChangeForm } from "./password-change-form";
import { PlanCard } from "./plan-card";
import { IUserData } from "./types";
import { toast } from "sonner";
import LoadingSpinner from "@/components/spinner/LoadingSpinner";
import { useSidebar } from "@/providers/SidebarContext";
import { IUserToken } from "@/@types";

const mockUser = {
  email: "user@example.com",
  name: "Alex Johnson",
  plan: "starter", 
  avatar: "/profile.jpg"
};

const plans = [
  {
    id: "starter",
    name: "Starter",
    description: "Basic features for individual developers",
    price: "$0",
    features: [
      "Up to 5 projects",
      "Basic syntax analysis",
      "Error detection",
      "Community support"
    ],
    color: "bg-[#001A2C]",
    borderColor: "border-[#002945]",
    recommended: false
  },
  {
    id: "pro",
    name: "Pro",
    description: "Advanced features for professional developers",
    price: "$20",
    features: [
      "Unlimited projects",
      "Advanced syntax analysis",
      "Error detection & fixes",
      "Security scanning",
      "Performance insights",
      "Email support"
    ],
    color: "bg-[#001523]",
    borderColor: "border-[#00406C]",
    recommended: true
  },
  {
    id: "team",
    name: "Team",
    description: "Collaboration features for development teams",
    price: "$50",
    features: [
      "Everything in Pro",
      "Up to 10 team members",
      "Team collaboration",
      "Custom rule sets",
      "API access",
      "Priority support"
    ],
    color: "bg-[#001A2C]",
    borderColor: "border-[#002945]",
    recommended: false
  }
];

export default function ProfilePage( ) {
  const [user, setUser] = useState(mockUser);
  const { setUserData, userData } = useSidebar();
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameValue, setNameValue] = useState(userData.name);
  const [activeTab, setActiveTab] = useState("account");
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
 

  const handleSaveName = async () => {
    setIsSaving(true);
    if (nameValue.trim()) {
      try {
        const response = await fetch("/api/users/update-name", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            userId: userData.userId,
            newName: nameValue
          }),
        });
  
        const data = await response.json();
        if (!response.ok) {
          toast.error(data.error || "Update failed", { duration: 2000 });
        } else {
          setUser(prevUser => ({
            ...prevUser,
            name: data.user.name
          }));
          setUserData((prev: IUserToken) => ({...prev, name: data.user.name}));
          setNameValue(data.user.name); 
          setIsSaving(false);
          setIsEditingName(false);
          toast.success("Username updated successfully", { duration: 2000 });
        }
  
      } catch (error) {
        toast.error("Network error occurred", { duration: 2000 });
      }
    }
  };

  const handleCancelEdit = () => {
    setNameValue(userData.name);
    setIsEditingName(false);
  };

  const getVisiblePlans = () => {
    if (userData.plan === "starter") {
      return plans.filter((plan) => plan.id === "pro" || plan.id === "team");
    } else if (userData.plan === "pro") {
      return plans.filter((plan) => plan.id === "team");
    }
    return [];
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#00111C] text-[#F2F2F2] px-8">
      <main className="container py-8">
        <motion.div
          className="grid gap-8 md:grid-cols-[1fr_3fr]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Sidebar */}
          <motion.div variants={itemVariants} className="space-y-6">
            <Card className="bg-[#001523] border-[#002945]">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    className="relative mb-4"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <Avatar className="h-24 w-24 border-2 border-[#00406C]">
                      <AvatarImage src={user.avatar} alt={userData.name} />
                      <AvatarFallback className="text-2xl bg-[#00406C] text-[#F2F2F2]">
                        {userData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 rounded-full bg-[#00406C] p-1.5 text-[#F2F2F2] shadow-lg">
                      <User className="h-4 w-4" />
                    </div>
                  </motion.div>

                  <h2 className="text-xl font-bold mb-1">{userData.name}</h2>
                  <p className="text-sm text-[#B3B3B3] mb-3">{userData.email}</p>

                    <Badge className="bg-[#00406C] hover:bg-[#003A61] mb-4">
                      {userData?.plan?.charAt(0).toUpperCase() + userData?.plan?.slice(1)} {" "}
                      Plan
                    </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#001523] border-[#002945]">
              <CardContent className="p-0">
                <nav className="flex flex-col">
                  <button
                    onClick={() => setActiveTab("account")}
                    className={`cursor-pointer flex items-center gap-3 px-6 py-4 text-left transition-colors hover:bg-[#001A2C] ${
                      activeTab === "account"
                        ? "bg-[#001A2C] border-l-2 border-[#00406C]"
                        : ""
                    }`}
                  >
                    <User className="h-5 w-5 text-[#00406C]" />
                    <span>Account Settings</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("billing")}
                    className={`cursor-pointer flex items-center gap-3 px-6 py-4 text-left transition-colors hover:bg-[#001A2C] ${
                      activeTab === "billing"
                        ? "bg-[#001A2C] border-l-2 border-[#00406C]"
                        : ""
                    }`}
                  >
                    <CreditCard className="h-5 w-5 text-[#00406C]" />
                    <span>Billing & Plans</span>
                  </button>
                </nav>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Account Settings Tab */}
            {activeTab === "account" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-[#001523] border-[#002945]">
                  <CardHeader>
                    <CardTitle className="text-2xl">Account Settings</CardTitle>
                    <CardDescription className="text-[#B3B3B3]">
                      Manage your account information and security settings
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">
                        Personal Information
                      </h3>

                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-[#B3B3B3] mb-1.5 block">
                            Email Address
                          </label>
                          <Input
                            value={userData.email}
                            disabled
                            className="bg-[#001A2C] border-[#002945] text-[#B3B3B3]"
                          />
                          <p className="text-xs text-[#B3B3B3] mt-1.5">
                            Your email address cannot be changed
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-[#B3B3B3] mb-1.5 block">
                            Full Name
                          </label>
                          <div className="flex gap-2">
                            {isEditingName ? (
                              <>
                                <Input
                                  value={nameValue}
                                  onChange={(e) => setNameValue(e.target.value)}
                                  className="bg-[#001A2C] border-[#002945] text-[#F2F2F2]"
                                />
                                <Button
                                  size="icon"
                                  onClick={handleSaveName}
                                  className="bg-[#00406C] hover:bg-[#003A61] cursor-pointer"
                                >
                                  {
                                    isSaving
                                    ? 
                                    <LoadingSpinner/> 
                                    :
                                    <Save className="h-4 w-4" />
                                  }
                                </Button>
                                <Button
                                  size="icon"
                                  variant="outline"
                                  onClick={handleCancelEdit}
                                  className="border-[#002945] hover:bg-[#001A2C] cursor-pointer"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </>
                            ) : (
                              <>
                                <Input
                                  value={userData.name}
                                  disabled
                                  className="bg-[#001A2C] border-[#002945] text-[#F2F2F2]"
                                />
                                <Button
                                  size="icon"
                                  variant="outline"
                                  onClick={() => setIsEditingName(true)}
                                  className="border-[#002945] hover:bg-[#001A2C] cursor-pointer"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator className="bg-[#002945]" />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Security</h3>

                      <div>
                        <Button
                          variant="outline"
                          onClick={() => setShowPasswordDialog(true)}
                          className="border-[#002945] hover:bg-[#001A2C] cursor-pointer"
                        >
                          <Lock className="h-4 w-4 mr-2" />
                          Change Password
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Billing & Plans Tab */}
            {activeTab === "billing" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-[#001523] border-[#002945] mb-6">
                  <CardHeader>
                    <CardTitle className="text-2xl">Billing & Plans</CardTitle>
                    <CardDescription className="text-[#B3B3B3]">
                      Manage your subscription and billing information
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Current Plan</h3>

                      <div className="bg-[#001A2C] border border-[#002945] rounded-lg p-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <Badge className="bg-[#00406C] hover:bg-[#003A61]">
                                {userData.plan.charAt(0).toUpperCase() +
                                  userData.plan.slice(1)}
                              </Badge>
                              <span className="text-sm text-[#B3B3B3]">
                                {userData.plan === "starter"
                                  ? "$0/month"
                                  : userData.plan === "pro"
                                  ? "$20/month"
                                  : "$50/month"}
                              </span>
                            </div>
                            <p className="text-sm mt-2">
                              {userData.plan === "starter"
                                ? "Basic features for individual developers"
                                : userData.plan === "pro"
                                ? "Advanced features for professional developers"
                                : "Collaboration features for development teams"}
                            </p>
                          </div>

                          {userData.plan === "team" && (
                            <div className="flex items-center gap-2 bg-[#003356]/30 text-[#F2F2F2] px-3 py-1.5 rounded-md">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-sm">
                                You are on our highest tier plan
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Upgrade options */}
                    {(userData.plan === "starter" || userData.plan === "pro") && (
                      <div className="space-y-4">
                        <div className="flex flex-col">
                          <h3 className="text-lg font-medium">
                            Upgrade Options
                          </h3>
                          {userData.plan === "pro" && (
                            <p className="text-sm text-[#B3B3B3]">
                              The Team plan is well-suited for team
                              collaboration
                            </p>
                          )}
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                          {getVisiblePlans().map((plan) => (
                            <PlanCard
                              key={plan.id}
                              plan={plan}
                              currentPlan={userData.plan}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Billing History */}
                <Card className="bg-[#001523] border-[#002945]">
                  <CardHeader>
                    <CardTitle>Billing History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {userData.plan === "starter" ? (
                      <div className="text-center py-6">
                        <p className="text-[#B3B3B3]">
                          No billing history available on the Starter plan
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="bg-[#001A2C] border border-[#002945] rounded-lg p-4 flex justify-between items-center">
                          <div>
                            <p className="font-medium">
                              {userData.plan.charAt(0).toUpperCase() +
                                userData.plan.slice(1)}{" "}
                              Plan - Monthly
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              {userData.plan === "pro" ? "$20.00" : "$50.00"}
                            </p>
                            <Badge
                              variant="outline"
                              className="border-green-500 text-green-500"
                            >
                              Paid
                            </Badge>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </main>

      {/* Password Change Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className="bg-[#001523] border-[#002945] text-[#F2F2F2] ">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription className="text-[#B3B3B3]">
              Enter your current password and a new password below.
            </DialogDescription>
          </DialogHeader>

          <PasswordChangeForm
            onSuccess={() => {
              setShowPasswordDialog(false);
              toast.success("Password changed successfully", { duration: 2000 });
            }}
            onCancel={() => setShowPasswordDialog(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
