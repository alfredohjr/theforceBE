import express from 'express';

import AuthUserService from '../Service/AuthUserService';

async function AuthUser(request: express.Request, response: express.Response, next: express.NextFunction) {

    try {

        const authorization = request.headers.authorization;

        const token = authorization?.split(' ')[1]

        const AuthUser = new AuthUserService();

        const userInfo = await AuthUser.execute({ token });

        request.headers.userId = userInfo;

    } catch (err) {
        return response.status(400).json( { error: err.message } );
    }
    
    next();
}

export default AuthUser;