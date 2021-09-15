import { request, response, Router } from 'express';
import multer from 'multer';

import uploadConfig from '../../theforceBE/config/upload';

import AuthUser from '../Middlewares/AuthUser.middlewares';
import IsValidUserPassword from '../Middlewares/IsValidUserPassword.middlewares';

import CreateUserService from '../Services/User/CreateUserService';
import DeleteUserAvatarService from '../Services/User/DeleteUserAvatarService';
import DeleteUserService from '../Services/User/DeleteUserService';
import UpdateUserAvatarService from '../Services/User/UpdateUserAvatarService';
import UpdateUserService from '../Services/User/UpdateUserService';

const upload = multer(uploadConfig);

const usersRouter = Router();

usersRouter.post('/', async (request, response, next) => {
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
        next(err);
    }
})

usersRouter.use(AuthUser);

usersRouter.patch(
    '/avatar',
    upload.single('avatar'),
    async (request, response, next) => {
        try {
            const user_id = request.user.id;
            const avatar = request.file?.filename;

            const updateUserAvatar = new UpdateUserAvatarService();

            const user = updateUserAvatar.execute({user_id, avatar});

            return response.status(200).json({ message: 'success'});            
        } catch (err) {
            next(err);
        }
});

usersRouter.delete(
    '/avatar',
    async (request, response, next) => {
        try {
            const user_id = request.user.id;

            const deleteUserAvatar = new DeleteUserAvatarService();

            await deleteUserAvatar.execute({user_id});

            return response.status(200).json({ message: 'success'});            
        } catch (err) {
            next(err);
        }
});

usersRouter.use(IsValidUserPassword);

usersRouter.delete('/', async (request, response, next) => {
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
        next(err);
    }
});

usersRouter.put('/', async (request, response, next) => {
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
        next(err);
    }
});


export default usersRouter;