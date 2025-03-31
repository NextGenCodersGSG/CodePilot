"use client";
import { createContext, useContext, ReactNode } from "react";
import { IProject } from "@/@types";
import { usePersistentState } from "@/hooks/usePersistentState";

const SidebarContext = createContext<{
    sidebarProjects: IProject[];
  addProject: (project: IProject) => void;
}>({
    sidebarProjects: [],
  addProject: () => {},
});

export const SidebarDataProvider = ({ children }: { children: ReactNode }) => {
  const [sidebarProjects, setSidebarProjects] = usePersistentState<IProject[]>("userProjects",[]);

  const addProject = (project: IProject) => {
    setSidebarProjects((prev) => [...prev, project]);
  };

  return (
    <SidebarContext.Provider value={{ sidebarProjects, addProject }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
