import mongoose from "mongoose";

export interface IBug {
    correction: string;
    error: string;
    severity: string;
  }
  
export interface IPerformance {
    issue: string;
    severity: string;
    solution: string;
  }
  
export interface ISecurity {
    fix: string;
    severity: string;
    vulnerability: string;
  }

export interface IAnalysis {
  performance_issues?: IPerformance[];
  security_issues?: ISecurity[];
  bugs?: IBug[];
  description?: string;
  overall_suggestions?: string[];
}

export enum Role {
  User = "user",
  Admin = "admin",
  Guest = "guest"
}

export type UserRoles = `${Role}`;

export interface IUser {
  name: string;
  email: string;
  role: UserRoles; 
  password: string;
}

export interface ICodeReview {
  user: mongoose.Types.ObjectId;
  language: string;
  codeFile: string;
  createdAt: Date;
}

export interface IAIReviewResponse{
  review: mongoose.Types.ObjectId;
  description: string;
  performanceIssues: String;
  securityIssues: String;
  bugs: String;
  overallSuggestions: String;
}

export interface ILogin extends Pick<IUser, 'email' | 'password'> {}
