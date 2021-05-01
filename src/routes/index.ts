import Router from 'express';

import usersRouter from './user.router';
import loginRouter from './login.router';
import logoutRouter from './logout.router';
import productRouter from './product.router';

const routes = Router();

routes.use('/user', usersRouter);
routes.use('/login', loginRouter);
routes.use('/logout', logoutRouter);
routes.use('/product', productRouter);

export default routes;