import { getRepository } from 'typeorm';

import User from '../../Models/User';
import Token from '../../Models/Token';

import AppError from '../../../theforceBE/errors/AppError';

interface Request {
    email: string;
    token?: string;
}

class DeleteUserService {
    public async execute({ email, token }: Request): Promise<void> {
        
        if(!email) {
            throw new AppError('please, send email for delete.');
        }

        const usersRepository = getRepository(User);

        const userExists = await usersRepository.findOne({
            where: {
                email
            }
        })

        if(!userExists){
            throw new AppError('user not found');
        }

        const tokenRepository = getRepository(Token);
        
        const tokenInBlackList = await tokenRepository.findOne({
            hash: token,
            isvalid: false
        });

        if(tokenInBlackList) {
            throw new AppError('invalid token')
        }

        await tokenRepository.update(
            {
                user_id: userExists.id
            },
            {
                isvalid: false
            }
        );

        await usersRepository.update(userExists.id,{
            deleted_at: new Date(),
            name: '---[DELETED]---',
            email: '---[DELETED]---'
        });
        
    }
}

export default DeleteUserService;