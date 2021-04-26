import Router from 'express';

import usersRouter from './user.router';
import loginRouter from './login.router';

const routes = Router();

routes.use('/user', usersRouter);
routes.use('/login', loginRouter);


export default routes;