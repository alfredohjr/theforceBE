import { getRepository } from 'typeorm';

import User from '../models/User';
import Token from '../models/Token';

interface Request {
    email: string;
    token?: string;
}

class DeleteUserService {
    public async execute({ email, token }: Request): Promise<void> {
        
        if(!email) {
            throw new Error('please, send email for delete.');
        }

        const usersRepository = getRepository(User);

        const userExists = await usersRepository.findOne({
            where: {
                email
            }
        })

        if(!userExists){
            throw new Error('user not found');
        }

        const tokenRepository = getRepository(Token);
        
        const tokenInBlackList = await tokenRepository.findOne({
            hash: token,
            isvalid: false
        });

        if(tokenInBlackList) {
            throw new Error('invalid token')
        }

        const newToken = tokenRepository.create({
            hash: token,
            isvalid: false
        });

        await tokenRepository.save(newToken);        
        await usersRepository.update(userExists.id,{
            deleted_at: new Date()
        });
        
    }
}

export default DeleteUserService;