import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';

import Token from '../../Models/Token';
import AppError from '../../../theforceBE/errors/AppError';

interface Request {
    token?: string;
    user_id: string;
}

class AuthLogoutService {
    public async execute({ token, user_id }: Request): Promise<void> {

        if(!token) {
            throw new AppError('please, send token')
        }

        const isValidToken = jwt.verify(token,'ONovoSiteSemSentido');

        if(!isValidToken) {
            throw new AppError('invalid token');
        }
        
        const tokenRepository = getRepository(Token);

        await tokenRepository.update({user_id},{
            isvalid: false
        });
        
        const newToken = tokenRepository.create({
            hash: token,
            user_id,
            isvalid: false
        });

        await tokenRepository.save(newToken);
        
    }
}

export default AuthLogoutService;