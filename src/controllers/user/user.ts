import express from 'express';
import { UserService } from '../../services/user/user';

class UserController {
    static create = async (
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ) => {
        const { name, phone } = request.body;
        const result = await UserService.create(name, phone);
        console.log('User created successfully!');
        return response.status(200).json({
            status: true,
            content: {
                data: result,
            },
        });
    };
}

export default UserController;
