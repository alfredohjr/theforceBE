import { getRepository } from 'typeorm';
import Entity from '../models/Entity';
import EntityLog from '../models/EntityLog';

interface Request {
    id: string;
    user_id: string;
};

class DeleteEntityService {
    public async execute({id, user_id}: Request): Promise<void> {

        const entityRepository = getRepository(Entity);
        const entityLogRepository = getRepository(EntityLog);

        const entityExists = await entityRepository.findOne({
            where: {
                id,
                deleted_at: null
            }
        });

        if(!entityExists) {
            throw new Error('entity not found');
        }

        await entityRepository.update(entityExists.id,{
            deleted_at: new Date()
        });

        const entitylog = entityLogRepository.create({
            user_id,
            entity_id: id,
            code: 'DELETE',
            message: `{delete:'${id}'}`
        });

        await entityLogRepository.save(entitylog);

    }
}

export default DeleteEntityService;