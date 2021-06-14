import { getRepository } from 'typeorm';
import Document from '../models/Document';
import Entity from '../models/Entity';
import EntityLog from '../models/EntityLog';
import CreateEntityLogService from './CreateEntityLogService';

interface Request {
    id: string;
    user_id: string;
};

class DeleteEntityService {
    public async execute({id, user_id}: Request): Promise<void> {

        const entityRepository = getRepository(Entity);
        const documentRepository = getRepository(Document);

        const entityExists = await entityRepository.findOne({
            where: {
                id,
                deleted_at: null
            }
        });

        if(!entityExists) {
            throw new Error('entity not found');
        }

        const isOpenDocument = await documentRepository.findOne({
            where: {
                entity_id: id, 
                closed_at: null,
                deleted_at: null
            }
        })

        if(isOpenDocument) {
            throw new Error('find open document for this entity, delete abort');
        }

        await entityRepository.update(entityExists.id,{
            deleted_at: new Date()
        });

        const entityLog = new CreateEntityLogService();
        await entityLog.execute({
            user_id,
            entity_id: id,
            code: 'DELETE',
            message: `{delete:'${id}'}`
        });

    }
}

export default DeleteEntityService;