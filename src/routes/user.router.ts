import { request, response, Router } from 'express';

import AuthUser from '../middlewares/AuthUser.middlewares';

import CreateUserService from '../Service/CreateUserService';
import DeleteUserService from '../Service/DeleteUserService';
import UpdateUserService from '../Service/UpdateUserService';

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

usersRouter.use(AuthUser);

usersRouter.delete('/', async (request, response) => {
    try {
        const { email } = request.body;
        const token = request.headers.authorization?.split(' ')[1];

        const deleteUser = new DeleteUserService();

        await deleteUser.execute({
            email,
            token
        });

        return response.status(200).json({message: 'user deleted'})

    } catch (err) {
        return response.status(400).json({ error: err.message});
    }
});

usersRouter.put('/', async (request, response) => {
    try {
        const { name, email, password, newPassword } = request.body;

        const updateUser = new UpdateUserService();
        
        const user = await updateUser.execute({
            name,
            email,
            password,
            newPassword
        });

        return response.status(200).json({name: user?.name, email: user?.email});
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default usersRouter;