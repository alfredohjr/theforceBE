import Router from 'express';

import cors from 'cors';

import PermissionUser from '../../User/Middlewares/Permission.middlewares';
import AuthUser from '../../User/Middlewares/AuthUser.middlewares';

import usersRouter from '../../User/Routes/user.router';
import loginRouter from '../../User/Routes/login.router';
import logoutRouter from '../../User/Routes/logout.router';
import productRouter from '../../Shop/Routes/product.router';
import depositRouter from '../../Shop/Routes/deposit.router';
import entityRouter from '../../Shop/Routes/entity.router';
import documentRouter from '../../Shop/Routes/document.router';
import stockRouter from '../../Shop/Routes/stock.router';


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
routes.use('/stock', stockRouter);

export default routes;