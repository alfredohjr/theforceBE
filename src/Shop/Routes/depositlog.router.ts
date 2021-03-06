import { request, response, Router } from 'express';

import AuthUser from '../../User/Middlewares/AuthUser.middlewares';

const depositlogRouter = Router();

depositlogRouter.use(AuthUser);


depositlogRouter.get('/', async (request, response, next) => {
    try {
        next(err);
    } catch (err) {
        next(err);
    }
});


export default depositlogRouter;
