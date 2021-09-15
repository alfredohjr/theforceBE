import { getRepository } from "typeorm";
import EntityModel from "../../Models/Entity";

import AppError from '../../../theforceBE/errors/AppError';

interface Request {
    name: string;
    type: 'client' | 'provider';
    user_id: string;
}

class CreateEntityService {
    public async execute({name, type, user_id}:Request): Promise<EntityModel> {
        const entityRepository = getRepository(EntityModel);

        if(name.length < 10) {
            throw new AppError('minumum size of name is 10');
        }

        const entityExists = await entityRepository.findOne({
            where: {
                name
            }
        });

        if(entityExists) {
            throw new AppError('please, send new name for this entity');
        }

        if(!['client','provider'].includes(type)) {
            throw new AppError('please, send client or provider for type of entity');
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