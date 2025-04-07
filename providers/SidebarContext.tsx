"use client";
import { createContext, useContext, ReactNode, useCallback, useState } from "react";
import { IProject } from "@/@types";
import { usePersistentDbState } from "@/hooks/usePersistentDbState";
import { getUserId } from "@/app/(main)/code-analysis/utils/getUserId";

const SidebarContext = createContext<{
  sidebarProjects: IProject[];
  addProject: (project: IProject) => void;
  loading: boolean;
  error: Error | null;
  addUserSession: (uId: string) => void
}>({
  sidebarProjects: [],
  addProject: () => {},
  loading: false,
  error: null,
  addUserSession: ()=>{}
});

export const SidebarDataProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string>("");

  const fetchProjects = useCallback(async (): Promise<IProject[]> => {
    setUserId(await getUserId() || "");

    if(!userId) return [];
    const response = await fetch(`/api/get-projects?userId=${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    const data = await response.json();
    
    return data.data;
  }, [userId]);

  const saveProject = useCallback(async (project: IProject): Promise<void> => {
    if (!project.userId) project.userId = userId;
    const response = await fetch('/api/add-project', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    });
    
    if (!response.ok) {
      throw new Error('Failed to save project');
    }
  }, [userId]);

  const [sidebarProjects, setSidebarProjects, loading, error] = usePersistentDbState<IProject[]>(
    [], // initially Empty
    fetchProjects,
    async (projects) => {
      if (projects.length > 0) {
        const latestProject = projects[projects.length - 1];
        await saveProject(latestProject);
      }
    }
  );

  const addProject = (project: IProject) => {
    setSidebarProjects((prev) => [...prev, project]);
  };

  const addUserSession = (userId: string) => {
    setUserId(userId);
  }

  return (
    <SidebarContext.Provider value={{ sidebarProjects, addProject, loading, error ,addUserSession}}>

      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);

