import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { TabsContent } from "@radix-ui/react-tabs";
import { useEffect, useState } from "react";

export default function UserMatrics() {
    const [metrics, setMetrics] = useState({
        bugsCount: 0,
        performanceIssuesCount: 0,
        securityIssuesCount: 0,
        totalIssues: 0
    });
    return (
        <div className="w-full h-full"> {/* Ensures full width and height for the component */}
            <Card className="bg-[#001523] border-[#002945] w-full h-full"> {/* Added h-full for Card */}
                <CardHeader>
                    <CardTitle>Users Engagement Metrics</CardTitle>
                    <CardDescription className="text-[#B3B3B3]">Detailed analytics on user engagement</CardDescription>
                </CardHeader>
                <CardContent className="h-full"> {/* Ensuring CardContent also takes full height */}
                    <div className="space-y-6 h-full overflow-y-auto"> {/* Enables scrolling if content overflows */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-[#B3B3B3]">Bug Issues</span>
                            </div>
                            <div className="h-2 w-full bg-[#001A2C] rounded-full overflow-hidden">
                                <div className="h-full bg-[#DC2626] rounded-full" ></div>
                            </div>
                            <span className="text-sm text-[#B3B3B3]"></span>
                        </div>
    
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-[#B3B3B3]">Performance Issues</span>
                            </div>
                            <div className="h-2 w-full bg-[#001A2C] rounded-full overflow-hidden">
                                <div className="h-full bg-[#FBBF24] rounded-full" style={{ }}></div>
                            </div>
                            <span className="text-sm text-[#B3B3B3]"></span>
                        </div>
    
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-[#B3B3B3]">Security Issues</span>
                            </div>
                            <div className="h-2 w-full bg-[#001A2C] rounded-full overflow-hidden">
                                <div className="h-full bg-[#34D399] rounded-full" ></div>
                            </div>
                            <span className="text-sm text-[#B3B3B3]"></span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}