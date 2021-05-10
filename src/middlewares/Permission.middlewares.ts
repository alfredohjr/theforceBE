import express from 'express';

async function PermissionUser(request: express.Request, response: express.Response, next: express.NextFunction) {

    try {
        console.log(request.method,request.url,request.user.id);
        console.log(request.body);
    } catch (err) {
        return response.status(400).json( { error: err.message } );
    }
    
    next();
}

export default PermissionUser;