import express from 'express';
import IsValidDepositService from '../Service/IsValidDepositService';
import IsValidDocumentService from '../Service/IsValidDocumentService';
import IsValidEntityService from '../Service/IsValidEntityService';

async function IsValidDocument(request: express.Request, response: express.Response, next: express.NextFunction) {

    try {

        const { entity_id, deposit_id } = request.body;

        if(request.method !== 'POST') {
            const { id } = request.body;
            const isValidDeposit = new IsValidDocumentService();
            await isValidDeposit.execute({id});
        }

        const isValidEntity = new IsValidEntityService();
        await isValidEntity.execute({id: entity_id});

        const isValidDeposit = new IsValidDepositService();
        await isValidDeposit.execute({id: deposit_id});

    } catch (err) {
        return response.status(400).json( { error: err.message } );
    }
    
    next();
}

export default IsValidDocument;