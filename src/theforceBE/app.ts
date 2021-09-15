import express from 'express';
import 'reflect-metadata';

import createConnection from './database';
import routes from './routes';
import uploadConfig from './config/upload';
import ErrorMiddleware from './middlewares/ErrorMiddleware';

createConnection();
const app = express();

app.use(express.json());
app.use('/media', express.static(uploadConfig.directory))

app.get('/', (request, response) => {
    try {
        return response.status(200).json({message:"Ola"});
    } catch (err) {
        return response.status(400).json({message:err.message});
    }
})

app.use(routes);

app.use(ErrorMiddleware);

export default app;