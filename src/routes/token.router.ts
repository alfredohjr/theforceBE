import { request, response, Router } from 'express';

import AuthUser from '../middlewares/AuthUser.middlewares';

const tokenRouter = Router();

tokenRouter.use(AuthUser);


tokenRouter.post('/', async (request, response) => {
    try {
        response.status(500).json({message:`${request.method} is empty`})
    } catch (err) {
        response.status(500).json({message:`${request.method} is empty`})
    }
});

tokenRouter.put('/', async (request, response) => {
    try {
        response.status(500).json({message:`${request.method} is empty`})
    } catch (err) {
        response.status(500).json({message:`${request.method} is empty`})
    }
});

tokenRouter.delete('/', async (request, response) => {
    try {
        response.status(500).json({message:`${request.method} is empty`})
    } catch (err) {
        response.status(500).json({message:`${request.method} is empty`})
    }
});

tokenRouter.get('/', async (request, response) => {
    try {
        response.status(500).json({message:`${request.method} is empty`})
    } catch (err) {
        response.status(500).json({message:`${request.method} is empty`})
    }
});


export default tokenRouter;
