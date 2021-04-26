import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';

import Token from '../models/Token';

interface Request {
    token?: string;
}

class AuthUserService {
    public async execute({ token } : Request) : Promise<void> {

        if(!token) {
            throw new Error('please, send valid token');
        }

        const isValidToken = jwt.verify(token,'ONovoSiteSemSentido');

        if(!isValidToken) {
            throw new Error('invalid token');
        }
        
        const tokenRepository = getRepository(Token);

        const tokenInBlackList = await tokenRepository.findOne({
            where: {
                hash: token,
                isvalid: false
            }
        });

        if(tokenInBlackList) {
            throw new Error('invalid token')
        }


    }
}

export default AuthUserService;