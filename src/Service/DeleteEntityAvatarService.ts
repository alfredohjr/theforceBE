import path from "path";
import fs from 'fs';

import { getRepository, IsNull } from "typeorm";

import uploadConfig from '../config/upload';
import EntityModel from "../models/Entity";
import IsValidEntityService from "./IsValidEntityService";

interface Request {
    user_id: string;
    id: string;
}

class DeleteEntityAvatarService {
    public async execute({user_id, id}: Request) {
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
            avatar: null
        });
    }
}

export default DeleteEntityAvatarService;