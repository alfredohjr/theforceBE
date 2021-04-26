import { Router } from 'express';

import AuthLogoutService from '../Service/AuthLogoutService';

const logoutRouter = Router();

logoutRouter.post('/', async (request, response) => {

    try {
        const token = request.headers.authorization?.split(' ')[1];

        const AuthLogout = new AuthLogoutService();

        await AuthLogout.execute({
            token
        });

        return response.status(200).json({message: 'success'});
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default logoutRouter;