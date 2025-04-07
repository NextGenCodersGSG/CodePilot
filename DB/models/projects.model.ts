import { IProject } from "@/@types";
import mongoose, { Schema, Document } from "mongoose";

export interface IProjectDocument extends Document, IProject {
}

// Bug Schema
const BugSchema = new Schema({
  error: { type: String, required: true },
  correction: { type: String, required: true },
  severity: { type: String, required: true },
});

// Performance Schema
const PerformanceSchema = new Schema({
  issue: { type: String, required: true },
  severity: { type: String, required: true },
  solution: { type: String, required: true },
});

// Security Schema
const SecuritySchema = new Schema({
  vulnerability: { type: String, required: true },
  severity: { type: String, required: true },
  fix: { type: String, required: true },
});

const ProjectSchema = new Schema<IProjectDocument>(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    url: { type: String, required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, index: true },
    description: { type: String, required: true },
    overall_suggestions: [{ type: String }],
    bugs: [BugSchema],
    performance_issues: [PerformanceSchema],
    security_issues: [SecuritySchema],
  },
  { timestamps: true }
);

ProjectSchema.index({ name: 1 });

const projectModel =
  mongoose.models.Project ||
  mongoose.model<IProjectDocument>("Project", ProjectSchema);

export default projectModel;