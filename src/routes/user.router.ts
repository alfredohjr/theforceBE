import { request, response, Router } from 'express';

import CreateUserService from '../Service/CreateUserService';
import DeleteUserService from '../Service/DeleteUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
    try {
        const { name, email, password } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password
        });

        return response.status(200).json({name, email});

    } catch (err) {
        return response.status(400).json({ error: err.message});
    }
})

usersRouter.delete('/', async (request, response) => {
    try {
        const { name, email } = request.body;

        const deleteUser = new DeleteUserService();

        deleteUser.execute({
            email
        });

        return response.status(200).json({message: 'user deleted!'})

    } catch (err) {
        return response.status(400).json({ error: err.message});
    }
});

export default usersRouter;