import jwt from 'jsonwebtoken';
import express from 'express';

const verifyUser = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
) => {
    try {
        const token = request.cookies['secret'];

        // const jwt_key = process.env.JWT_SECRET_KEY as string;
        const payload = await jwt.verify(token, 'akdsj7#!642@42545');
        console.log(payload);

        if (payload !== null) {
            if (payload.isAdmin === true) {
                request.user = payload.email;
            } else if (payload.isAdmin === false) {
                request.table_number = payload.table_number;
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
