// TODO:empty

import { request, response, Router } from 'express';

import AuthUser from '../middlewares/AuthUser.middlewares';

const stockmovementRouter = Router();

stockmovementRouter.use(AuthUser);


stockmovementRouter.post('/', async (request, response) => {
    try {
        response.status(500).json({message:`${request.method} is empty`})
    } catch (err) {
        response.status(500).json({message:`${request.method} is empty`})
    }
});

stockmovementRouter.put('/', async (request, response) => {
    try {
        response.status(500).json({message:`${request.method} is empty`})
    } catch (err) {
        response.status(500).json({message:`${request.method} is empty`})
    }
});

stockmovementRouter.delete('/', async (request, response) => {
    try {
        response.status(500).json({message:`${request.method} is empty`})
    } catch (err) {
        response.status(500).json({message:`${request.method} is empty`})
    }
});

stockmovementRouter.get('/', async (request, response) => {
    try {
        response.status(500).json({message:`${request.method} is empty`})
    } catch (err) {
        response.status(500).json({message:`${request.method} is empty`})
    }
});


export default stockmovementRouter;
