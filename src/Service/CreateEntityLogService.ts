import { getRepository } from 'typeorm';
import EntityLog from '../models/EntityLog';

interface Request{
    entity_id: string;
    user_id: string;
    code: string;
    message: string;
};

class CreateEntityLogService {
    public async execute({entity_id, user_id, code, message}:Request): Promise<EntityLog>{
        const entitylogRepository = getRepository(EntityLog);

        const entitylog = entitylogRepository.create({
            entity_id,
            user_id,
            code,
            message
        });

        await entitylogRepository.save(entitylog);

        return entitylog;
    }
}
export default CreateEntityLogService;
