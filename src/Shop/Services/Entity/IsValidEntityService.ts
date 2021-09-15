import { getRepository } from "typeorm";
import EntityModel from "../../Models/Entity";

import AppError from '../../../theforceBE/errors/AppError';

interface Request {
    id: string;
}

class IsValidEntityService {
    public async execute({id}: Request): Promise<void> {
        const entityRepository = getRepository(EntityModel);

        const entityExists = await entityRepository.findOne({
            where: {
                id
            }
        });

        if(!entityExists) {
            throw new AppError('entity not found');
        }

        if(entityExists.deleted_at !== null) {
            throw new AppError('entity is broken, contact administrator');
        }
    }
}

export default IsValidEntityService;