import { Router } from 'express';
import AuthUser from '../middlewares/AuthUser.middlewares';
import IsValidEntity from '../middlewares/IsValidEntity.middlewares';
import CreateEntityService from '../Service/CreateEntityService';

const entityRouter = Router();

entityRouter.use(AuthUser);
entityRouter.use(IsValidEntity);

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

entityRouter.put('/', async(request, response) => {
    try {
        return response.status(500).json({ message: `${request.method} is empty`});
    } catch (err) {
        response.status(400).json({ error: err.message})
    }
});

entityRouter.delete('/', async(request, response) => {
    try {
        return response.status(500).json({ message: `${request.method} is empty`});
    } catch (err) {
        response.status(400).json({ error: err.message})
    }
});

export default entityRouter;