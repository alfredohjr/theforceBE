import express from 'express';
import { getRepository } from 'typeorm';
import DepositLog from '../models/DepositLog';

async function RegisterDeposit(request: express.Request, response: express.Response, next: express.NextFunction) {

    try {

        const code = request.method;
        const message = request.body;
        const user_id = request.user.id;
        const deposit_id = request.body.id;

        const depositLogRepository = getRepository(DepositLog);

        const depositLog = depositLogRepository.create({
            user_id,
            deposit_id,
            code,
            message
        });

        await depositLogRepository.save(depositLog);

    } catch (err) {
        return response.status(400).json( { error: err.message } );
    }
    
    next();
}

export default RegisterDeposit;