import { getRepository } from "typeorm";
import EntityModel from "../models/Entity";

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
            throw new Error('entity not found');
        }

        if(entityExists.deleted_at !== null) {
            throw new Error('entity is broken, contact administrator');
        }
    }
}

export default IsValidEntityService;