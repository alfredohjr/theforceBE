import Router from 'express';

import usersRouter from './user.router';
import loginRouter from './login.router';
import logoutRouter from './logout.router';
import productRouter from './product.router';
import depositRouter from './deposit.router';
import entityRouter from './entity.router';
import documentRouter from './document.router';

const routes = Router();

routes.use('/user', usersRouter);
routes.use('/login', loginRouter);
routes.use('/logout', logoutRouter);
routes.use('/product', productRouter);
routes.use('/deposit', depositRouter);
routes.use('/entity', entityRouter);
routes.use('/document', documentRouter);

export default routes;