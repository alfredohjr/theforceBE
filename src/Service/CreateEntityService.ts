import { getRepository } from "typeorm";
import EntityModel from "../models/Entity";

interface Request {
    name: string;
    type: 'client' | 'provider';
    user_id: string;
}

class CreateEntityService {
    public async execute({name, type, user_id}:Request): Promise<EntityModel> {
        const entityRepository = getRepository(EntityModel);

        const entityExists = await entityRepository.findOne({
            where: {
                name
            }
        });

        if(entityExists) {
            throw new Error('please, send new name for this entity');
        }

        const entity = entityRepository.create({
            name,
            type,
            user_id
        });

        await entityRepository.save(entity);

        return entity;
    }
}

export default CreateEntityService;