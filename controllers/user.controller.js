import userService from "../services/user.service.js";

class UserController {
    async createUser(req, res, next) {
        try {
            const user = await userService.createUser(req.body);
            return res.status(201).json({ success: true, message: "User created successfully", data: user, });
        } catch (error) {
            next(error);
        }
    }
    async getUsers(req, res, next) {
        try {
            const users = await userService.getUsers();
            return res.status(200).json({ success: true, data: users, });
        } catch (error) {
            next(error);
        }
    }
    async getUserById(req, res, next) {
        try {
            const user = await userService.getUserById(req.params.userId);
            return res.status(200).json({ success: true, data: user });
        } catch (error) {
            next(error);
        }
    }
    async updateUser(req, res, next) {
        try {
            const user = await userService.updateUser(req.params.userId, req.body);
            return res.status(200).json({ success: true, message: "User updated", data: user, });
        } catch (error) {
            next(error);
        }
    }
};

export default new UserController();