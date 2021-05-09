import { getRepository } from 'typeorm';
import Entity from '../models/Entity';
import EntityLog from '../models/EntityLog';

interface Request {
    id: string;
    user_id: string;
    name?: string;
}

class UpdateEntityService {
    public async execute({id, user_id, name}: Request): Promise<Entity> {
        const entityRepository = getRepository(Entity);

        const entityExists = await entityRepository.findOne(id);

        if(!entityExists) {
            throw new Error('entity not found');
        }

        if(!(name)) {
            throw new Error('please, send name for update');
        }

        await entityRepository.update(entityExists.id,{
            name: name ? name : entityExists.name
        });

        const entityLogRepository = getRepository(EntityLog);

        const entityLog = entityLogRepository.create({
            user_id: user_id,
            entity_id: id,
            code: `UPDATE`,
            message: `{service:'update',name: {from:'${entityExists.name}',to:'${name}'}`
        });

        await entityLogRepository.save(entityLog);

        const entity = await entityRepository.findOne(id);

        return entity ? entity : entityExists;
    }
}

export default UpdateEntityService;