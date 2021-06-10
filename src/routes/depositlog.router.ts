import { request, response, Router } from 'express';

import AuthUser from '../middlewares/AuthUser.middlewares';

const depositlogRouter = Router();

depositlogRouter.use(AuthUser);


depositlogRouter.post('/', async (request, response) => {
    try {
        response.status(500).json({message:`${request.method} is empty`})
    } catch (err) {
        response.status(500).json({message:`${request.method} is empty`})
    }
});

depositlogRouter.put('/', async (request, response) => {
    try {
        response.status(500).json({message:`${request.method} is empty`})
    } catch (err) {
        response.status(500).json({message:`${request.method} is empty`})
    }
});

depositlogRouter.delete('/', async (request, response) => {
    try {
        response.status(500).json({message:`${request.method} is empty`})
    } catch (err) {
        response.status(500).json({message:`${request.method} is empty`})
    }
});

depositlogRouter.get('/', async (request, response) => {
    try {
        response.status(500).json({message:`${request.method} is empty`})
    } catch (err) {
        response.status(500).json({message:`${request.method} is empty`})
    }
});


export default depositlogRouter;
