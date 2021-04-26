import jwt from 'jsonwebtoken';

interface Request {
    token?: string;
}

interface UserInfo {
    id: string;
}

class AuthUserService {
    public async execute({ token } : Request) : Promise<UserInfo> {

        if(!token) {
            throw new Error('please, send valid token');
        }

        const isValidToken = jwt.verify(token,'ONovoSiteSemSentido');

        if(!isValidToken) {
            throw new Error('invalid token');
        }

        return isValidToken.id;
                

    }
}

export default AuthUserService;