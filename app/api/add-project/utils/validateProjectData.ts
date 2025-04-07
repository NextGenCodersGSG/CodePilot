import { IProject } from "@/@types";

export function validateProjectData(data: any): IProject {
<<<<<<< HEAD
    // Check for required fields
    const requiredFields = [
      'name', 'url', 'title', 'slug', 'description'
=======
    const requiredFields = [
      'name', 'url', 'title', 'slug', 'description', 'userId'
>>>>>>> ea5d391babbc57689cdd76f23727f8f0c038863a
    ];
    
    for (const field of requiredFields) {
      if (!data[field]) {
        throw new Error(`validation failed: ${field} is required`);
      }
    }
    
<<<<<<< HEAD
    // Ensure arrays exist (even if empty)
=======
>>>>>>> ea5d391babbc57689cdd76f23727f8f0c038863a
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
  