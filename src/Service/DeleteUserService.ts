import { getRepository } from 'typeorm';

import User from '../models/User';

interface Request {
    email: string;
}

class DeleteUserService {
    public async execute({ email }: Request): Promise<void> {
        
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

        await usersRepository.remove(userExists);
    }
}

export default DeleteUserService;