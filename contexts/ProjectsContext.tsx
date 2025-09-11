import React, { createContext, useState, useEffect, useContext, ReactNode, useMemo } from 'react';
import { Project } from '../types';
import { projects as defaultProjects } from '../data/projects';

interface ProjectsContextType {
  projects: Project[];
  updateProject: (updatedProject: Project) => void;
  addProject: (newProject: Project) => void;
  resetProjects: () => void;
  deleteProject: (projectId: string) => void;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

const PROJECTS_STORAGE_KEY = 'portfolio_projects';

export const ProjectsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    try {
      const storedProjects = localStorage.getItem(PROJECTS_STORAGE_KEY);
      if (storedProjects) {
        setProjects(JSON.parse(storedProjects));
      } else {
        setProjects(defaultProjects);
      }
    } catch (error) {
      console.error("Failed to load projects from local storage", error);
      setProjects(defaultProjects);
    }
  }, []);

  const persistProjects = (newProjects: Project[]) => {
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(newProjects));
    setProjects(newProjects);
  };

  const updateProject = (updatedProject: Project) => {
    const newProjects = projects.map(p => p.id === updatedProject.id ? updatedProject : p);
    persistProjects(newProjects);
  };

  const addProject = (newProject: Project) => {
    const newProjects = [...projects, newProject];
    persistProjects(newProjects);
  };

  const deleteProject = (projectId: string) => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      const newProjects = projects.filter(p => p.id !== projectId);
      persistProjects(newProjects);
    }
  };

  const resetProjects = () => {
    if(window.confirm('Are you sure you want to reset all projects to their default state? This action cannot be undone.')) {
        localStorage.removeItem(PROJECTS_STORAGE_KEY);
        setProjects(defaultProjects);
        window.location.reload(); // To ensure all components re-fetch the default state
    }
  };

  const reversedProjects = useMemo(() => [...projects].reverse(), [projects]);

  return (
    <ProjectsContext.Provider value={{ projects: reversedProjects, updateProject, addProject, resetProjects, deleteProject }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = (): ProjectsContextType => {
  const context = useContext(ProjectsContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }
  return context;
};