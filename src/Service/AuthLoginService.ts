import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/User';

interface Request {
    email: string;
    password: string;
}

interface Token {
    token: string;
}

class AuthLoginService {
    public async execute({ email, password } : Request) : Promise<Token> {

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

        const passwordIsValid = await bcrypt.compare(password,userExists.password);

        if(!passwordIsValid) {
            throw new Error('user or password is invalid.');
        }
        
        const token = jwt.sign({ id:userExists.id },'ONovoSiteSemSentido', {
            expiresIn: 300
        })

        return { token }

    }
}

export default AuthLoginService;