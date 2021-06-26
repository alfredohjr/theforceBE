import { request, response, Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';

import AuthUser from '../middlewares/AuthUser.middlewares';
import IsValidUserPassword from '../middlewares/IsValidUserPassword.middlewares';

import CreateUserService from '../Service/CreateUserService';
import DeleteUserAvatarService from '../Service/DeleteUserAvatarService';
import DeleteUserService from '../Service/DeleteUserService';
import UpdateUserAvatarService from '../Service/UpdateUserAvatarService';
import UpdateUserService from '../Service/UpdateUserService';

const upload = multer(uploadConfig);

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

usersRouter.patch(
    '/avatar',
    upload.single('avatar'),
    async (request, response) => {
        try {
            const user_id = request.user.id;
            const avatar = request.file?.filename;

            const updateUserAvatar = new UpdateUserAvatarService();

            const user = updateUserAvatar.execute({user_id, avatar});

            return response.status(200).json({ message: 'success'});            
        } catch (err) {
            return response.status(400).json({ error: err.message });
        }
});

usersRouter.delete(
    '/avatar',
    async (request, response) => {
        try {
            const user_id = request.user.id;

            const deleteUserAvatar = new DeleteUserAvatarService();

            await deleteUserAvatar.execute({user_id});

            return response.status(200).json({ message: 'success'});            
        } catch (err) {
            return response.status(400).json({ error: err.message });
        }
});

usersRouter.use(IsValidUserPassword);

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