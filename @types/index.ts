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
  title: string;
  slug: string;
  performance_issues: IPerformance[];
  security_issues: ISecurity[];
  bugs: IBug[];
  description: string;
  overall_suggestions: string[];
}

export enum Role {
  User = "user",
  Admin = "admin",
  Developer = "developer"
}

export type UserRoles = `${Role}`;

export interface IUser {
  name: string;
  email: string;
  role: UserRoles;
  password: string;
}
export interface IUserFromDB {
  _id: string;
  name: string;
  email: string;
  role: UserRoles;      
  password: string;
  createdAt: string; 
  updatedAt: string;
  __v?: number;
}
export interface ICodeReview {
  user: mongoose.Types.ObjectId;
  language: string;
  codeFile: string;
  createdAt: Date;
}

export interface IAIReviewResponse {
  review: mongoose.Types.ObjectId;
  description: string;
  performanceIssues: String;
  securityIssues: String;
  bugs: String;
  overallSuggestions: String;
}

export interface IAnalysis {
  title: string;
  slug: string;
  performance_issues: IPerformance[];
  security_issues: ISecurity[];
  bugs: IBug[];
  description: string;
  overall_suggestions: string[];
}

interface Project {
  userId:string;
  name: string;
  url: string;
}

export type IProject = Project & IAnalysis;

export interface ILogin extends Pick<IUser, 'email' | 'password'> { }

export type PlanId = 'free' | 'pro' | 'team';

export interface Plan {
  name: string;
  price: string;
  description: string;
  features: string[];
  id: PlanId;
}

export interface CreateCheckoutSessionRequest {
  plan: PlanId;
}

export interface CreateCheckoutSessionResponse {
  sessionId?: string;
  message?: string;
  error?: string;
}

export interface StripeWebhookEvent {
  id: string;
  object: string;
  api_version: string;
  data: {
    object: any;
  };
  type: string;
  created: number;
}

export interface EmailTemplateProps {
  link?: string;
  title: string;
  description: string;
  secondary: string;
  button?: string;
}

export enum Status{
  PENDING = 'PENDING', 
  APPROVED = 'APPROVED', 
  REJECTED = 'REJECTED', 
  CANCELED = 'CANCELED'
}

export type MeetingStatus = `${Status}`;

export interface IMeeting {
  id?: string;
  title: string;
  description: string;
  scheduledAt: Date;
  duration: number;
  status: Status; 
  userId: string;
  developerId?: string;
  requestedAt?: Date;
  zoom: IZoom
}

export interface IZoom {
  meetingId: string;
  zoomId:  string;
  joinUrl: string;
  startUrl: string;
  password: string;
}

export interface ILogin extends Pick<IUser, 'email' | 'password'> {}

export interface EmailTemplateProps {
  link?: string;
  title: string;
  description: string;
  secondary: string;
  button?: string;
}
export interface IChartData {
  name: string;
  value: number;
}
// export interface IUsersRolesCount {
//   name: string,
//   value: number
// }
// export interface ISignsPerDay {
//   name: string;
//   new: number;
// }

