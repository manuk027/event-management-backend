import userRepository from "../repositories/user.repository.js";
import ErrorClass from "../utils/error.js";

class UserService {
    async createUser(userData) {
        const existingUser = await userRepository.findByName(userData.name);
        if (existingUser) throw new ErrorClass("User with the same name exist", 409);
        return await userRepository.create(userData);
    }
    async getUsers() {
        return await userRepository.findAll();
    }
    async getUserById(userId) {
        const user = await userRepository.findById(userId);
        if (!user) throw new ErrorClass("User with this userId does not exist.", 404);
        return user;
    }
    async updateUser(userId, updateData) {
        const user = await userRepository.findById(userId);
        if (!user) throw new ErrorClass("User with this userId does not exist.", 404);
        return await userRepository.update(userId, updateData);
    }
};

export default new UserService();