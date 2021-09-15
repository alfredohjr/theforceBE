import { Router } from 'express';

import AuthLoginService from '../Services/Token/AuthLoginService';

const loginRouter = Router();

loginRouter.post('/', async (request, response, next) => {
    try {
        const { email, password } = request.body;

        const AuthLogin = new AuthLoginService();

        const token = await AuthLogin.execute({
            email,
            password
        });


        return response.status(200).json(token);

    } catch (err) {
        next(err);
    }
})

export default loginRouter;