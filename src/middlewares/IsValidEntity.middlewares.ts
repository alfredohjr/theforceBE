import express from 'express';
import IsValidEntityService from '../Service/IsValidEntityService';

async function IsValidEntity(request: express.Request, response: express.Response, next: express.NextFunction) {

    try {

        if(request.method !== 'POST') {
            const { id } = request.body;
            const isValidEntity = new IsValidEntityService();
            await isValidEntity.execute({id});
        }

    } catch (err) {
        return response.status(400).json( { error: err.message } );
    }
    
    next();
}

export default IsValidEntity;