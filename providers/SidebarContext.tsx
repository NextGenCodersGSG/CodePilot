"use client";
import { createContext, useContext, ReactNode, useCallback } from "react";
import { IProject } from "@/@types";
import { usePersistentDbState } from "@/hooks/usePersistentDbState";

const SidebarContext = createContext<{
  sidebarProjects: IProject[];
  addProject: (project: IProject) => void;
  loading: boolean;
  error: Error | null;
}>({
  sidebarProjects: [],
  addProject: () => {},
  loading: false,
  error: null
});

export const SidebarDataProvider = ({ children }: { children: ReactNode }) => {
  
  const fetchProjects = useCallback(async (): Promise<IProject[]> => {
    const response = await fetch('/api/get-projects');
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    const data = await response.json();
    return data.data;
  }, []);

  const saveProject = useCallback(async (project: IProject): Promise<void> => {
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
  }, []);

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

  return (
    <SidebarContext.Provider value={{ sidebarProjects, addProject, loading, error }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);