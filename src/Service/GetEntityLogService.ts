import { getRepository } from 'typeorm';
import EntityLog from '../models/EntityLog';

class GetEntityLogService {
    public async execute(entity_id: string): Promise<EntityLog[]> {
        const entitylogRepository = getRepository(EntityLog);

        const entitylogs = await entitylogRepository.find({
            where: {
                deleted_at: null,
                entity_id
            }
        });

        return entitylogs;
    }
}

export default GetEntityLogService;
