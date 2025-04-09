import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { TabsContent } from "@radix-ui/react-tabs";
import { Download, FileText } from "lucide-react";
import { useEffect, useState } from "react";


export default function UserMatrics() {
    const [metrics, setMetrics] = useState({
        bugsCount: 0,
        performanceIssuesCount: 0,
        securityIssuesCount: 0,
        totalIssues: 0
    });


    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const response = await fetch('/api/user-metrics');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
   
                const data = await response.json();
   
                if (!data.success) {
                    throw new Error('Expected success to be true');
                }
               
                const { metrics } = data;
                setMetrics(metrics);
            } catch (error) {
                console.error("Error fetching metrics:", error);
            }
        };
   
        fetchMetrics();
    }, []);


    const bugsPercentage = metrics.totalIssues ? (metrics.bugsCount / metrics.totalIssues) * 100 : 0;
    const performancePercentage = metrics.totalIssues ? (metrics.performanceIssuesCount / metrics.totalIssues) * 100 : 0;
    const securityPercentage = metrics.totalIssues ? (metrics.securityIssuesCount / metrics.totalIssues) * 100 : 0;


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
                                <div className="h-full bg-[#DC2626] rounded-full" style={{ width: `${bugsPercentage}%` }}></div>
                            </div>
                            <span className="text-sm text-[#B3B3B3]">{metrics.bugsCount} ({bugsPercentage.toFixed(2)}%)</span>
                        </div>
   
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-[#B3B3B3]">Performance Issues</span>
                            </div>
                            <div className="h-2 w-full bg-[#001A2C] rounded-full overflow-hidden">
                                <div className="h-full bg-[#FBBF24] rounded-full" style={{ width: `${performancePercentage}%` }}></div>
                            </div>
                            <span className="text-sm text-[#B3B3B3]">{metrics.performanceIssuesCount} ({performancePercentage.toFixed(2)}%)</span>
                        </div>
   
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-[#B3B3B3]">Security Issues</span>
                            </div>
                            <div className="h-2 w-full bg-[#001A2C] rounded-full overflow-hidden">
                                <div className="h-full bg-[#34D399] rounded-full" style={{ width: `${securityPercentage}%` }}></div>
                            </div>
                            <span className="text-sm text-[#B3B3B3]">{metrics.securityIssuesCount} ({securityPercentage.toFixed(2)}%)</span>
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
        </div>
    );
}
