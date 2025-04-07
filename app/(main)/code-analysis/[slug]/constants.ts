import { IProject } from "@/@types";

export const defaultValue : IProject = {
    userId: "",
    title: "",
    name: "",
    slug: "",
    url: "",
    performance_issues: [],
    security_issues: [],
    bugs: [],
    description: "",
    overall_suggestions: [],
};

export const notFoundValue : IProject = {
    userId: "NotFound",
    title: "NotFound",
    name: "NotFound",
    slug: "NotFound",
    url: "NotFound",
    performance_issues: [],
    security_issues: [],
    bugs: [],
    description: "",
    overall_suggestions: [], 
}