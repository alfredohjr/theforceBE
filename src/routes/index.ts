import Router from 'express';
import cors from 'cors';

import PermissionUser from '../middlewares/Permission.middlewares';

import usersRouter from './user.router';
import loginRouter from './login.router';
import logoutRouter from './logout.router';
import productRouter from './product.router';
import depositRouter from './deposit.router';
import entityRouter from './entity.router';
import documentRouter from './document.router';
import AuthUser from '../middlewares/AuthUser.middlewares';

const routes = Router();

routes.use(cors());

routes.use('/user', usersRouter);
routes.use('/login', loginRouter);
routes.use('/logout', logoutRouter);

routes.use(AuthUser);
routes.use(PermissionUser);
routes.use('/product', productRouter);
routes.use('/deposit', depositRouter);
routes.use('/entity', entityRouter);
routes.use('/document', documentRouter);

export default routes;