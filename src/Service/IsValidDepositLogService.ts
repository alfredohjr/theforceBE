import { getRepository } from 'typeorm';
import DepositLog from '../models/DepositLog';

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
            throw new Error('depositlog not found');
        }
        
    }
}

export default IsValidDepositLogService;
