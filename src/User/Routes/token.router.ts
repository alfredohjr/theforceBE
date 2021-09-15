import { request, response, Router } from 'express';

import AuthUser from '../Middlewares/AuthUser.middlewares';

const tokenRouter = Router();

tokenRouter.use(AuthUser);


tokenRouter.get('/', async (request, response, next) => {
    try {
        response.status(500).json({message:`${request.method} is empty`})
    } catch (err) {
        next(err);
    }
});


export default tokenRouter;
