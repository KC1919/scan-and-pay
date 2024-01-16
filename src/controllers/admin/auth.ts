import AuthService from '../../services/admin/auth';
import express from 'express';
class AuthController {
    static register = async (
        request: express.Request,
        response: express.Response
    ) => {
        const { name, email, password } = request.body;
        const result = await AuthService.register(name, email, password);

        if (result) {
            return response.status(201).json({
                message: 'Admin user created successfully',
                status: true,
                data: {
                    result,
                },
            });
        }
    };

    static login = async (
        request: express.Request,
        response: express.Response
    ) => {
        const { email, password } = request.body;
        const token = await AuthService.login(email, password);

        console.log(token);

        // if token received
        if (token) {
            response.cookie('secret', token, {
                maxAge: Date.now() + 5 * 60 * 60 * 1000,
            });

            return response.status(200).json({
                message: 'User logged in successfully',
                status: true,
            });
        }
        return response
            .status(400)
            .json({ message: 'User failed to login', status: false });
    };
}

export default AuthController;
