import { getRepository } from 'typeorm';
import UserLog from '../../Models/UserLog';

import AppError from '../../../theforceBE/errors/AppError';

interface Request {
    id: string;
};

class IsValidUserLogService {
    public async execute({id}:Request): Promise<void> {
        const userlogRepository = getRepository(UserLog);

        const userlogExists = await userlogRepository.findOne({
            where: {
                id
            }
        });

        if(!userlogExists) {
            throw new AppError('userlog not found');
        }

    }
}

export default IsValidUserLogService;
