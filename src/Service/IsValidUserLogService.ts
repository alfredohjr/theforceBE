import { getRepository } from 'typeorm';
import UserLog from '../models/UserLog';

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
            throw new Error('userlog not found');
        }

    }
}

export default IsValidUserLogService;
