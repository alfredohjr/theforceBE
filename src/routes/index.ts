import Router from 'express';

import usersRouter from './user.router';
import loginRouter from './login.router';
import logoutRouter from './logout.router';

const routes = Router();

routes.use('/user', usersRouter);
routes.use('/login', loginRouter);
routes.use('/logout', logoutRouter);


export default routes;