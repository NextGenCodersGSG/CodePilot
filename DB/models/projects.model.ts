import { IProject } from "@/@types";
import mongoose, { Schema, Document } from "mongoose";

<<<<<<< HEAD
export interface IProjectDocument extends Document, IProject {}
=======
export interface IProjectDocument extends Document, IProject {
}
>>>>>>> ea5d391babbc57689cdd76f23727f8f0c038863a

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
<<<<<<< HEAD
    // Project fields
    name: { type: String, required: true },
    url: { type: String, required: true },
    
    // Analysis fields
=======
    userId: { type: String, required: true },
    name: { type: String, required: true },
    url: { type: String, required: true },
>>>>>>> ea5d391babbc57689cdd76f23727f8f0c038863a
    title: { type: String, required: true },
    slug: { type: String, required: true, index: true },
    description: { type: String, required: true },
    overall_suggestions: [{ type: String }],
<<<<<<< HEAD
    
    // Nested document arrays
=======
>>>>>>> ea5d391babbc57689cdd76f23727f8f0c038863a
    bugs: [BugSchema],
    performance_issues: [PerformanceSchema],
    security_issues: [SecuritySchema],
  },
  { timestamps: true }
);

<<<<<<< HEAD
// Create index for faster queries
=======
>>>>>>> ea5d391babbc57689cdd76f23727f8f0c038863a
ProjectSchema.index({ name: 1 });

const projectModel =
  mongoose.models.Project ||
  mongoose.model<IProjectDocument>("Project", ProjectSchema);

export default projectModel;