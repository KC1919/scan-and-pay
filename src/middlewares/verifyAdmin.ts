import jwt, { JwtPayload } from 'jsonwebtoken';
import express from 'express';

// interface CustomRequest extends Request {
//     user?: string;
// }

const verifyAdmin = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
) => {
    try {
        const token = request.cookies['secret'];

        // const jwt_key = process.env.JWT_SECRET_KEY as string;
        // eslint-disable-next-line @typescript-eslint/await-thenable
        const payload = await jwt.verify(token, 'akdsj7#!642@42545') as JwtPayload;

        if (payload !== null) {
            if (payload.isAdmin === true) {
                // request.user = payload.email;
                // (request as any) = { ...request, user: payload.email };

                // eslint-disable-next-line require-atomic-updates
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
