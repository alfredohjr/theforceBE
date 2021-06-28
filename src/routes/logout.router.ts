import { Router } from 'express';
import AuthUser from '../middlewares/AuthUser.middlewares';

import AuthLogoutService from '../Service/AuthLogoutService';

const logoutRouter = Router();

logoutRouter.use(AuthUser);
logoutRouter.post('/', async (request, response, next) => {

    try {
        const token = request.headers.authorization?.split(' ')[1];
        const user_id = request.user.id;

        const AuthLogout = new AuthLogoutService();

        await AuthLogout.execute({
            token,
            user_id
        });

        return response.status(200).json({message: 'success'});
    } catch (err) {
        next(err);
    }
});

export default logoutRouter;