import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';

import Token from '../models/Token';

interface Request {
    token?: string;
}

class AuthLogoutService {
    public async execute({ token }: Request): Promise<void> {

        if(!token) {
            throw new Error('please, send token')
        }

        const isValidToken = jwt.verify(token,'ONovoSiteSemSentido');

        if(!isValidToken) {
            throw new Error('invalid token');
        }
        
        const tokenRepository = getRepository(Token);
        
        const newToken = tokenRepository.create({
            hash: token,
            isvalid: false
        });

        await tokenRepository.save(newToken);
        
    }
}

export default AuthLogoutService;