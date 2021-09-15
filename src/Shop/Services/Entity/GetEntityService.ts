import { getRepository } from 'typeorm';
import Entity from '../../Models/Entity';

class GetEntityService {
    public async execute(): Promise<Entity[]> {
        const entityRepository = getRepository(Entity);

        const entitys = await entityRepository.find({
            where: {
                deleted_at: null
            }
        });

        return entitys;
    }
}

export default GetEntityService;
