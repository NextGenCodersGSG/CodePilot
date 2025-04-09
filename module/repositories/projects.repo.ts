import projectModel from "@/DB/models/projects.model";

export class ProjectsRepo {
    async getAll() {
        return await projectModel.find({});
    }
}

export default new ProjectsRepo();