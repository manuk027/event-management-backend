import userRepository from "../repositories/user.repository.js";

class UserService {
    async createUser(userData) {
        const existingUser = await userRepository.findByName(userData.name);
        if (existingUser) throw new Error("User with the same name exist");
        return await userRepository.create(userData);
    }
    async getUsers() {
        return await userRepository.findAll();
    }
    async getUserById(userId) {
        const user = await userRepository.findById(userId);
        if (!user) throw new Error("User with this userId does not exist.");
        return user;
    }
    async updateUser(userId, updateData) {
        const user = await userRepository.findById(userId);
        if (!user) throw new Error("User with this userId does not exist.");
        return await userRepository.update(userId, updateData);
    }
};

export default new UserService();