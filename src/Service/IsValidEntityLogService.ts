import { getRepository } from 'typeorm';
import EntityLog from '../models/EntityLog';

import AppError from '../errors/AppError';

interface Request {
    id: string;
};

class IsValidEntityLogService {
    public async execute({id}:Request): Promise<void> {
        const entitylogRepository = getRepository(EntityLog);

        const entitylogExists = await entitylogRepository.findOne({
            where: {
                id
            }
        });

        if(!entitylogExists) {
            throw new AppError('entitylog not found');
        }
    }
}

export default IsValidEntityLogService;
