import { request } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';

interface Request {
    email: string;
    password: string;
}

class AuthUserService {
    public async execute({ email, password } : Request) : Promise<void> {

        if(!(email || password)) {
            throw new Error('please, send email and password.');
        }

        const usersRepository = getRepository(User);

        const userExists = await usersRepository.findOne({
            where: {
                email
            }
        });

        if(!userExists) {
            throw new Error('user not found.');
        }

        if(userExists.password != password) {
            throw new Error('user or password is invalid.');
        }

    }
}

export default AuthUserService;