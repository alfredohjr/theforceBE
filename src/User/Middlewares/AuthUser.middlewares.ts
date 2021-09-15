import express from 'express';

import AuthUserService from '../Services/Token/AuthUserService';

async function AuthUser(request: express.Request, response: express.Response, next: express.NextFunction) {

    try {

        const authorization = request.headers.authorization;

        const token = authorization?.split(' ')[1]

        const AuthUser = new AuthUserService();

        const userInfo = await AuthUser.execute({ token });

        console.log(new Date(), request.method,request.url);

        request.user = {
            id: userInfo.id
        }

    } catch (err) {
        return response.status(401).json( { error: err.message } );
    }
    
    next();
}

export default AuthUser;