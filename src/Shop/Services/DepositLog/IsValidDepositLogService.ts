import { getRepository } from 'typeorm';
import DepositLog from '../../Models/DepositLog';

import AppError from '../../../theforceBE/errors/AppError';

interface Request {
    id: string;
};

class IsValidDepositLogService {
    public async execute({id}:Request): Promise<void> {
        const depositlogRepository = getRepository(DepositLog);

        const depositlogExists = await depositlogRepository.findOne({
            where: {
                id
            }
        });

        if(!depositlogExists) {
            throw new AppError('depositlog not found');
        }
        
    }
}

export default IsValidDepositLogService;
