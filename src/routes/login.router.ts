import { Router } from 'express';

import AuthLoginService from '../Service/AuthLoginService';

const loginRouter = Router();

loginRouter.post('/', async (request, response) => {
    try {
        const { email, password } = request.body;

        const AuthLogin = new AuthLoginService();

        const token = await AuthLogin.execute({
            email,
            password
        });


        return response.status(200).json(token);

    } catch (err) {
        return response.status(400).json({ error: err.message});
    }
})

export default loginRouter;