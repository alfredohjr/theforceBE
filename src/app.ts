import express from 'express';
import 'reflect-metadata';

import createConnection from './database';
import routes from './routes';

createConnection();
const app = express();
app.use(express.json());
app.use(routes);

app.get('/', (request, response) => {
    try {
        return response.status(200).json({message:"Ola"});
    } catch (err) {
        return response.status(400).json({message:err.message});
    }
})

export default app;