import Router from 'express';

import usersRouter from './user.router';

const routes = Router();

routes.use('/user', usersRouter);


export default routes;