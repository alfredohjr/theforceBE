import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';

import Token from '../models/Token';
import AppError from '../errors/AppError';

interface Request {
    token?: string;
}

interface Response {
    id: string
}


class AuthUserService {
    public async execute({ token } : Request) : Promise<Response> {

        if(!token) {
            throw new AppError('please, send valid token');
        }

        const isValidToken = jwt.verify(token,process.env.SECRET);

        if(!isValidToken) {
            throw new AppError('invalid token');
        }

        const tokenRepository = getRepository(Token);

        const tokenInBlackList = await tokenRepository.findOne({
            where: {
                hash: token,
                isvalid: false
            }
        });

        if(tokenInBlackList) {
            throw new AppError('invalid token')
        }
        
        return {
            id: (<any>isValidToken).id
        }
    }
}

export default AuthUserService;