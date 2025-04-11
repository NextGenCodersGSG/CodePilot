import userRepo from "../repositories/user.repo";

class UserService {
    async findAll() {
        return await userRepo.findAllUsers();
    }

    async getAllDevelopers(){
        return await userRepo.findAllDevelopers();
    }
}

export default new UserService();
