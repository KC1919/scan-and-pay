import jwt, { JwtPayload } from 'jsonwebtoken';
import express from 'express';

const verifyUser = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
) => {
    try {
        const token = request.cookies['secret'];

        // const jwt_key = process.env.JWT_SECRET_KEY as string;
        const payload = jwt.verify(token, 'akdsj7#!642@42545') as JwtPayload;
        console.log(payload);

        if (payload !== null) {
            if (!payload.isAdmin) {
                // (request as any).table_number = payload.table_number;
                request.table_number = payload.table_number;
                next();
            } else {
                console.log('Unauthorized user!');
            }
        } else {
            throw new Error('Failed to verify user!');
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
