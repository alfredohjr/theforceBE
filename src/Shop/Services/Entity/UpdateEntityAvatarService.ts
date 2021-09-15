import path from "path";
import fs from 'fs';

import { getRepository } from "typeorm";

import uploadConfig from '../../../theforceBE/config/upload';
import EntityModel from "../../Models/Entity";
import IsValidEntityService from "./IsValidEntityService";


interface Request {
    user_id: string;
    avatar?: string;
    id: string;
}

class UpdateEntityAvatarService {
    public async execute({user_id, id, avatar}: Request) {
        const EntityRepository = getRepository(EntityModel);
        const isValidEntity = new IsValidEntityService();

        await isValidEntity.execute({id});

        const entity = await EntityRepository.findOne(id);

        if(entity?.avatar) {
            const entityAvatarFile = path.join(uploadConfig.directory, entity.avatar);
            const entityAvatarFileExists = await fs.promises.stat(entityAvatarFile);

            if(entityAvatarFileExists) {
                await fs.promises.unlink(entityAvatarFile);
            }
        }

        await EntityRepository.update(id,{
            avatar
        });
    }
}

export default UpdateEntityAvatarService;