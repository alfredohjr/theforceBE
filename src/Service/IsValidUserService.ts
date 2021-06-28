import { getRepository } from 'typeorm';
import User from '../models/User';

import AppError from '../errors/AppError';

interface Request {
    id: string;
};

class IsValidUserService {
    public async execute({id}:Request): Promise<void> {
        const userRepository = getRepository(User);

        const userExists = await userRepository.findOne({
            where: {
                id
            }
        });

        if(!userExists) {
            throw new AppError('user not found');
        }

        if(userExists.deleted_at !== null) {
            throw new AppError('user deleted');
        }

    }
}

export default IsValidUserService;
