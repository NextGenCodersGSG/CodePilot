"use client"

import { useSidebar } from "@/providers/SidebarContext"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { AlertTriangle, Shield, Zap, Lightbulb, FileCode, CheckCircle, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { defaultValue, notFoundValue } from "./constants"
import LoadingSpinner from "@/components/spinner/LoadingSpinner"
import { IProject } from "@/@types"

interface IParams {
  params: Promise<{ slug: string }>
}

const Page = ({ params }: IParams) => {
  const { sidebarProjects, loading  } = useSidebar();
  const [slug, setSlug] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [project, setProject] = useState<IProject>(defaultValue);
  useEffect(() => {
    const loadData = async () => {

      try {
        const resolvedParams = await params;
        const currentSlug = resolvedParams.slug;
        setSlug(currentSlug);

        if (sidebarProjects && sidebarProjects.length > 0) {
          const foundProject = sidebarProjects.find(p => p.slug === currentSlug);
          if (foundProject) {
            setProject(foundProject);
          } else {
            setProject(notFoundValue);
            setNotFound(true);
          }
        } else if (sidebarProjects && sidebarProjects.length === 0) {
          setNotFound(true);
        }
      } catch (error) {
        console.error("Error resolving params:", error);
        setNotFound(true);
      }
    }

    loadData();
  }, [params, sidebarProjects])

  if (loading) {
    return (
      <motion.div className="w-full h-full flex justify-center items-center">
        <LoadingSpinner className="h-10 w-10 border-4" />
      </motion.div>
    )
  }
  
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "high":
        return "bg-red-500 hover:bg-red-600"
      case "medium":
        return "bg-yellow-500 hover:bg-yellow-600"
      case "low":
        return "bg-blue-500 hover:bg-blue-600"
      default:
        return "bg-primary hover:bg-secondary"
    }
  }

  if (project == notFoundValue && notFound) {
    return (
      <div className="container mx-auto p-6">
        <Card className="bg-card border-accent">
          <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[300px]">
            <Info className="h-16 w-16 text-primary mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Project Not Found</h2>
            <p className="text-muted-foreground">The project with slug "{slug}" could not be found.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Project Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="bg-card border-accent">
          <CardHeader>
            <div className="flex items-center gap-3">
              <FileCode className="h-6 w-6 text-primary" />
              <div>
                <CardTitle className="text-2xl text-foreground">{project.name || "Project Analysis"}</CardTitle>
                <CardDescription className="text-muted-foreground">Analysis results and recommendations</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg border border-accent">
              <h3 className="text-lg font-medium text-foreground mb-2">Project Description</h3>
              <p className="text-muted-foreground">{project.description || "No description available"}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Analysis Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="all" className="cursor-pointer">All Issues</TabsTrigger>
            <TabsTrigger value="bugs" className="flex items-center gap-2 cursor-pointer">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              Bugs
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2 cursor-pointer">
              <Shield className="h-4 w-4 text-green-500" />
              Security
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-2 cursor-pointer">
              <Zap className="h-4 w-4 text-yellow-500" />
              Performance
            </TabsTrigger>
          </TabsList>

          {/* All Issues Tab */}
          <TabsContent value="all" className="space-y-6">
            {/* Bugs Card */}
            <Card className="bg-card border-accent overflow-hidden pt-0">
              <div className="h-3 bg-gradient-to-r from-red-400 to-red-800"></div>
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <CardTitle className="text-foreground">Bugs & Errors</CardTitle>
                </div>
                <Badge className="bg-muted text-red-500">{project.bugs.length}</Badge>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px] pr-4">
                  {project.bugs.length > 0 ? (
                    <div className="space-y-4">
                      {project.bugs.map((bug, index) => (
                        <div key={index} className="bg-muted p-4 rounded-lg border border-accent">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium text-foreground">{bug.error}</h3>
                            <Badge className={`${getSeverityColor(bug.severity)}`}>{bug.severity}</Badge>
                          </div>
                          {bug.correction && (
                            <div className="mt-2 text-sm text-muted-foreground">
                              <span className="font-medium text-foreground">Suggested Fix: </span>
                              {bug.correction}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[150px] text-muted-foreground">
                      <CheckCircle className="h-10 w-10 text-green-500 mb-2" />
                      <p>No bugs detected</p>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Security Issues Card */}
            <Card className="bg-card border-accent overflow-hidden pt-0">
              <div className="h-3 bg-gradient-to-r from-green-400 to-green-800"></div>
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  <CardTitle className="text-foreground">Security Vulnerabilities</CardTitle>
                </div>
                <Badge className="bg-muted text-green-500">{project.security_issues.length}</Badge>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px] pr-4">
                  {project.security_issues.length > 0 ? (
                    <div className="space-y-4">
                      {project.security_issues.map((issue, index) => (
                        <div key={index} className="bg-muted p-4 rounded-lg border border-accent">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium text-foreground">{issue.vulnerability}</h3>
                            <Badge className={`${getSeverityColor(issue.severity)}`}>{issue.severity}</Badge>
                          </div>
                          {issue.fix && (
                            <div className="mt-2 text-sm text-muted-foreground">
                              <span className="font-medium text-foreground">Recommended Fix: </span>
                              {issue.fix}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[150px] text-muted-foreground">
                      <Shield className="h-10 w-10 text-green-500 mb-2" />
                      <p>No security vulnerabilities detected</p>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Performance Issues Card */}
            <Card className="bg-card border-accent overflow-hidden pt-0">
              <div className="h-3 bg-gradient-to-r from-yellow-400 to-yellow-800"></div>
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  <CardTitle className="text-foreground">Performance Issues</CardTitle>
                </div>
                <Badge className="bg-muted text-yellow-500">{project.performance_issues.length}</Badge>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px] pr-4">
                  {project.performance_issues.length > 0 ? (
                    <div className="space-y-4">
                      {project.performance_issues.map((issue, index) => (
                        <div key={index} className="bg-muted p-4 rounded-lg border border-accent">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium text-foreground">{issue.issue}</h3>
                            <Badge className={`${getSeverityColor(issue.severity)}`}>{issue.severity}</Badge>
                          </div>
                          {issue.solution && (
                            <div className="mt-2 text-sm text-muted-foreground">
                              <span className="font-medium text-foreground">Solution: </span>
                              {issue.solution}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[150px] text-muted-foreground">
                      <Zap className="h-10 w-10 text-yellow-500 mb-2" />
                      <p>No performance issues detected</p>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Overall Suggestions Card */}
            <Card className="bg-card border-accent overflow-hidden pt-0">
              <div className="h-3 bg-gradient-to-r from-blue-400 to-blue-800"></div>
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-blue-500" />
                  <CardTitle className="text-foreground">Overall Suggestions</CardTitle>
                </div>
                <Badge className="bg-muted text-blue-500">{project.overall_suggestions.length}</Badge>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px] pr-4">
                  {project.overall_suggestions.length > 0 ? (
                    <div className="space-y-4">
                      {project.overall_suggestions.map((suggestion, index) => (
                        <div key={index} className="bg-muted p-4 rounded-lg border border-accent">
                          <div className="flex items-start gap-3">
                            <div className="bg-blue-500/20 p-2 rounded-full flex-shrink-0 mt-1">
                              <Lightbulb className="h-4 w-4 text-blue-500" />
                            </div>
                            <p className="text-foreground">{suggestion}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[150px] text-muted-foreground">
                      <Lightbulb className="h-10 w-10 text-blue-500 mb-2" />
                      <p>No suggestions available</p>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bugs Tab */}
          <TabsContent value="bugs">
            <Card className="bg-card border-accent">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <CardTitle className="text-foreground">Bugs & Errors</CardTitle>
                </div>
                <CardDescription className="text-muted-foreground">
                  Detailed list of bugs and logical errors found in the code
                </CardDescription>
              </CardHeader>
              <CardContent>
                {project.bugs.length > 0 ? (
                  <div className="space-y-4">
                    {project.bugs.map((bug, index) => (
                      <div key={index} className="bg-muted p-4 rounded-lg border border-accent">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-foreground">{bug.error}</h3>
                          <Badge className={`${getSeverityColor(bug.severity)}`}>{bug.severity}</Badge>
                        </div>
                        {bug.correction && (
                          <div className="mt-4 text-sm">
                            <div className="font-medium text-foreground mb-1">Suggested Fix:</div>
                            <p className="text-muted-foreground">{bug.correction}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                    <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                    <h3 className="text-xl font-medium text-foreground mb-2">No Bugs Detected</h3>
                    <p>Your code appears to be free of bugs and logical errors.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <Card className="bg-card border-accent">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  <CardTitle className="text-foreground">Security Vulnerabilities</CardTitle>
                </div>
                <CardDescription className="text-muted-foreground">
                  Security issues and vulnerabilities found in the codebase
                </CardDescription>
              </CardHeader>
              <CardContent>
                {project.security_issues.length > 0 ? (
                  <div className="space-y-4">
                    {project.security_issues.map((issue, index) => (
                      <div key={index} className="bg-muted p-4 rounded-lg border border-accent">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-foreground">{issue.vulnerability}</h3>
                          <Badge className={`${getSeverityColor(issue.severity)}`}>{issue.severity}</Badge>
                        </div>
                        {issue.fix && (
                          <div className="mt-4 text-sm">
                            <div className="font-medium text-foreground mb-1">Recommended Fix:</div>
                            <p className="text-muted-foreground">{issue.fix}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                    <Shield className="h-16 w-16 text-green-500 mb-4" />
                    <h3 className="text-xl font-medium text-foreground mb-2">No Security Vulnerabilities</h3>
                    <p>Your code appears to be secure with no detected vulnerabilities.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance">
            <Card className="bg-card border-accent">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  <CardTitle className="text-foreground">Performance Issues</CardTitle>
                </div>
                <CardDescription className="text-muted-foreground">
                  Performance bottlenecks and optimization opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                {project.performance_issues.length > 0 ? (
                  <div className="space-y-4">
                    {project.performance_issues.map((issue, index) => (
                      <div key={index} className="bg-muted p-4 rounded-lg border border-accent">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-foreground">{issue.issue}</h3>
                          <Badge className={`${getSeverityColor(issue.severity)}`}>{issue.severity}</Badge>
                        </div>
                        {issue.solution && (
                          <div className="mt-4 text-sm">
                            <div className="font-medium text-foreground mb-1">Solution:</div>
                            <p className="text-muted-foreground">{issue.solution}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                    <Zap className="h-16 w-16 text-yellow-500 mb-4" />
                    <h3 className="text-xl font-medium text-foreground mb-2">No Performance Issues</h3>
                    <p>Your code appears to be optimized with no detected performance issues.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}

export default Page

