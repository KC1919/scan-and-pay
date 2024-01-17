import jwt from 'jsonwebtoken';
import express from 'express';

const verifyAdmin = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
) => {
    try {
        const token = request.cookies['secret'];

        // const jwt_key = process.env.JWT_SECRET_KEY as string;
        const payload = await jwt.verify(token, 'akdsj7#!642@42545');        

        if (payload !== null) {
            if (payload.isAdmin === true) {
                request.user = payload.email;
                next();
            } else {
                console.log('Unauthorized user!');
            }
        } else {
            throw new Error('Failed to verify admin user!');
        }
    } catch (error: any) {
        console.log('Failed to verify user, server error:', error);
        return response.status(500).json({
            status: false,
            error: error.message,
        });
    }
};

export default verifyAdmin;
