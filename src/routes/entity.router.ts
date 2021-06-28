import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';

import CreateEntityService from '../Service/CreateEntityService';
import DeleteEntityAvatarService from '../Service/DeleteEntityAvatarService';
import DeleteEntityService from '../Service/DeleteEntityService';
import GetEntityService from '../Service/GetEntityService';
import IsValidEntityService from '../Service/IsValidEntityService';
import UpdateEntityAvatarService from '../Service/UpdateEntityAvatarService';

const entityRouter = Router();

const upload = multer(uploadConfig);

entityRouter.post('/', async(request, response, next) => {
    try {

        const { name, type } = request.body;
        const user_id = request.user.id;

        const createEntity = new CreateEntityService();
        const entity = await createEntity.execute({
            name,
            user_id,
            type
        });

        return response.status(200).json(entity);

    } catch (err) {
        next(err);
    }
});

entityRouter.get('/', async (request, response, next) => {
    try {
        
        const getEntity = new GetEntityService();
        const entities = await getEntity.execute();

        return response.status(200).json(entities);
    } catch (err) {
        return response.status(400).json({error: err.message});
    }
});


entityRouter.put('/', async(request, response) => {
    try {

        const { id } = request.body;

        const isValidEntity = new IsValidEntityService();
        await isValidEntity.execute({id});

        return response.status(500).json({ message: `${request.method} is empty`});
    } catch (err) {
        response.status(400).json({ error: err.message})
    }
});

entityRouter.delete('/', async(request, response) => {
    try {
        const {id} = request.body;
        const user_id = request.user.id;

        const isValidEntity = new IsValidEntityService();
        await isValidEntity.execute({id});

        const deleteEntity = new DeleteEntityService();
        await deleteEntity.execute({id,user_id});

        return response.status(500).json({ message: `Entity deleted`});
    } catch (err) {
        response.status(400).json({ error: err.message})
    }
});

entityRouter.patch(
    '/avatar/:entity_id',
    upload.single('avatar'),
    async (request, response, next) => {
        try {
            const user_id = request.user.id;
            const avatar = request.file?.filename;
            const { entity_id } = request.params;

            const updateEntityAvatar = new UpdateEntityAvatarService();

            await updateEntityAvatar.execute({user_id, id: entity_id, avatar});

            return response.status(200).json({ message: 'success'});            
        } catch (err) {
            next(err);
        }
});

entityRouter.delete(
    '/avatar',
    async (request, response, next) => {
        try {
            const user_id = request.user.id;
            const { id } = request.body;

            const deleteEntityAvatar = new DeleteEntityAvatarService();

            await deleteEntityAvatar.execute({user_id, id});

            return response.status(200).json({ message: 'success'});            
        } catch (err) {
            next(err);
        }
});

export default entityRouter;