import express from 'express';
import IsValidDepositService from '../Service/IsValidDepositService';

async function IsValidDeposit(request: express.Request, response: express.Response, next: express.NextFunction) {

    try {

        const { id } = request.body;

        const isValidDeposit = new IsValidDepositService();
        await isValidDeposit.execute({id});
    } catch (err) {
        return response.status(400).json( { error: err.message } );
    }
    
    next();
}

export default IsValidDeposit;