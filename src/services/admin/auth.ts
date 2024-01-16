import Database from '../../loaders/database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { adminPrisma, adminCreatePrisma } from '../../types/admin/auth';

class AuthService {
    static async register(name: string, email: string, password: string) {
        try {
            const admin = await Database.instance.admin.findFirst({
                where: {
                    email,
                },
            });

            // if admin with this email already exits
            if (admin) {
                throw new Error('Admin with this email already exist');
            }

            // hash password
            const hashPass = await bcrypt.hash(password, 10);

            const document: adminCreatePrisma = {
                name,
                email,
                password: hashPass,
            };

            // create new admin
            const newAdmin = await Database.instance.admin.create({
                data: document,
                select: {
                    name: true,
                    email: true,
                },
            });

            if (!newAdmin) {
                throw new Error('Failed to create admin');
            }

            return newAdmin;
        } catch (error) {
            console.log('Failed to create admin, server error:', error);
        }
    }

    static async login(email: string, password: string) {
        try {
            const admin = await Database.instance.admin.findFirst({
                where: {
                    email,
                },
            });

            // check if admin exists
            if (!admin) {
                throw new Error('Admin does not exist');
            }

            // check password
            const checkPassword = await bcrypt.compare(
                password,
                admin.password
            );

            // incorrect password

            if (!checkPassword) {
                throw new Error(
                    'Failed to login admin user, invalid email or password'
                );
            }

            console.log(process.env.JWT_SECRET_KEY);
            // console.log(env(JWT_SECRET_KEY));
            

            // generate JWT token

            const token = await jwt.sign(
                {
                    isAdmin: true,
                    email: admin.email,
                },
                // process.env.JWT_SECRET_KEY as string , have to fix
                'akdsj7#!642@42545'
            );

            if (!token) {
                throw new Error(
                    'Failed to login admin user, error generating token'
                );
            }

            return token;
        } catch (error) {
            console.log('Failed to login admin user, server error', error);
        }
    }
}

export default AuthService;
