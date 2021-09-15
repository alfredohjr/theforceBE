import express from 'express';

import IsValidUserPasswordService from '../Services/User/IsValidUserPasswordService';

async function IsValidUserPassword(request: express.Request, response: express.Response, next: express.NextFunction) {

    try {

        const { email, password } = request.body;

        const isValidUserPassword = new IsValidUserPasswordService();

        await isValidUserPassword.execute({ email, password });

    } catch (err) {
        return response.status(400).json( { error: err.message } );
    }
    
    next();
}

export default IsValidUserPassword;