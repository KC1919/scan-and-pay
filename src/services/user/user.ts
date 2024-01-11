import Database from '../../loaders/database';

export class UserService {
    static async create(data: { name: string; phone: number }) {
        try {
        } catch (error) {
            console.log('Failed to create user:', error);
        }
    }
}
