import ProjectsRepo from "../repositories/projects.repo";

class ProjectsService {

    async findAll() {
        return await ProjectsRepo.getAll();
    }
}

export default new ProjectsService