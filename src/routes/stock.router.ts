// TODO:empty

import { request, response, Router } from 'express';

import AuthUser from '../middlewares/AuthUser.middlewares';

const stockRouter = Router();

stockRouter.use(AuthUser);


stockRouter.post('/', async (request, response) => {
    try {
        response.status(500).json({message:`${request.method} is empty`})
    } catch (err) {
        response.status(500).json({message:`${request.method} is empty`})
    }
});

stockRouter.put('/', async (request, response) => {
    try {
        response.status(500).json({message:`${request.method} is empty`})
    } catch (err) {
        response.status(500).json({message:`${request.method} is empty`})
    }
});

stockRouter.delete('/', async (request, response) => {
    try {
        response.status(500).json({message:`${request.method} is empty`})
    } catch (err) {
        response.status(500).json({message:`${request.method} is empty`})
    }
});

stockRouter.get('/', async (request, response) => {
    try {
        response.status(500).json({message:`${request.method} is empty`})
    } catch (err) {
        response.status(500).json({message:`${request.method} is empty`})
    }
});


export default stockRouter;
