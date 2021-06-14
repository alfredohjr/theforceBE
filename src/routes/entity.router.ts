import { Router } from 'express';
import CreateEntityService from '../Service/CreateEntityService';
import DeleteEntityService from '../Service/DeleteEntityService';
import GetEntityService from '../Service/GetEntityService';
import IsValidEntityService from '../Service/IsValidEntityService';

const entityRouter = Router();

entityRouter.post('/', async(request, response) => {
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
        response.status(400).json({ error: err.message})
    }
});

entityRouter.get('/', async (request, response) => {
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

export default entityRouter;