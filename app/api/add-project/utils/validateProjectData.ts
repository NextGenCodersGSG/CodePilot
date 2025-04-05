import { IProject } from "@/@types";

export function validateProjectData(data: any): IProject {
    const requiredFields = [
      'name', 'url', 'title', 'slug', 'description'
    ];
    
    for (const field of requiredFields) {
      if (!data[field]) {
        throw new Error(`validation failed: ${field} is required`);
      }
    }
    
    if (!Array.isArray(data.bugs)) {
      data.bugs = [];
    }
    
    if (!Array.isArray(data.performance_issues)) {
      data.performance_issues = [];
    }
    
    if (!Array.isArray(data.security_issues)) {
      data.security_issues = [];
    }
    
    if (!Array.isArray(data.overall_suggestions)) {
      data.overall_suggestions = [];
    }
    
    return data as IProject;
  }
  