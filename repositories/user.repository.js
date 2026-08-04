import User from "../models/user-model.js";

class UserRepository {
    async create(userData) {
        return await User.create(userData);
    }
    async findAll() {
        return await User.find().sort({ createdAt: -1 });
    }
    async findById(userId) {
        return await User.findById(userId);
    }
    async update(userId, updateData) {
        return await User.findByIdAndUpdate(userId, updateData, {
            new: true,
            runValidators: true,
        });
    }
    async findByName(name) {
        return await User.findOne({ name });
    }
};

export default new UserRepository();