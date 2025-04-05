import userRepo from "../repositories/user.repo";

class UserService {
    async findAll() {
        return await userRepo.findAllUsers();
    }
}

export default new UserService();
