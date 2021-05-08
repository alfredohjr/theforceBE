import { getRepository } from 'typeorm';
import EntityLog from '../models/EntityLog';

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
            throw new Error('entitylog not found');
        }
    }
}

export default IsValidEntityLogService;
