import express from 'express';

import AuthUserService from '../Service/AuthUserService';

async function AuthUser(request: express.Request, response: express.Response, next: express.NextFunction) {

    try {

        const { email, password } = request.body;

        const AuthUser = new AuthUserService();

        await AuthUser.execute({
            email,
            password
        });

    } catch (err) {
        return response.status(400).json( { error: err.message } );
    }
    
    next();
}

export default AuthUser;