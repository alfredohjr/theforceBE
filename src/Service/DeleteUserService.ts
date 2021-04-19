import { getRepository } from 'typeorm';

import User from '../models/User';

interface Request {
    email: string;
}

class DeleteUserService {
    public async execute({ email }: Request): Promise<void> {
        if(!email) {
            throw new Error('error for delete user!');
        }
    }
}

export default DeleteUserService;