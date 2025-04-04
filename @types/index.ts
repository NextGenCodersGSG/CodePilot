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
  name: string;
  url: string;
}

export type IProject = Project & IAnalysis;

export interface ILogin extends Pick<IUser, 'email' | 'password'> { }

export interface EmailTemplateProps {
  link?: string;
  title: string;
  description: string;
  secondary: string;
  button?: string;
}

export interface IMeeting {
    title: string;
    description: string;
    adminId: mongoose.Types.ObjectId;
    scheduledAt: Date
    duration: number;
}
export enum Status{
  PENDING = 'PENDING', 
  APPROVED = 'APPROVED', 
  REJECTED = 'REJECTED', 
  COMPLETED = 'COMPLETED'
}

export type MeetingStatus = `${Status}`;

export interface IMeeting {
  title: string;
  description: string;
  adminId: mongoose.Types.ObjectId;
  scheduledAt: Date
  duration: number;
  status: Status; 
  requestedAt?: Date;
  admin?:  mongoose.Schema.Types.ObjectId;
  user?:  mongoose.Schema.Types.ObjectId;
  zoomMeeting?: string;
}

export interface IZoom {
  meeting: mongoose.Schema.Types.ObjectId;
  zoomId:  string;
  joinUrl: string;
  startUrl: string;
  password: string;
}