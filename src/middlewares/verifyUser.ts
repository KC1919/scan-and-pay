import jwt from 'jsonwebtoken';
import express from 'express';

const verifyUser = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
) => {
    try {
        const token = request.cookies['secret'];
        const jwt_key = process.env.JWT_SECRET_KEY;
        const payload = await jwt.verify(token, jwt_key);
        if (payload !== null) {
            if (payload.isAdmin === true) {
                request.user = payload.email;
            } else if (payload.isAdmin === false) {
                request.table = payload.table;
            }
            next();
        } else {
            console.log('Unauthorized user!');
        }
    } catch (error: any) {
        console.log('Failed to verify user, server error:', error);
        return response.status(500).json({
            status: false,
            error: error.message,
        });
    }
};

export default verifyUser;
