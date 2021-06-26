import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/User';
import TokenModel from '../models/Token';

interface Request {
    email: string;
    password: string;
}

interface Token {
    token: string;
}

class AuthLoginService {
    public async execute({ email, password } : Request) : Promise<TokenModel> {

        if(!(email || password)) {
            throw new Error('please, send email and password.');
        }

        const usersRepository = getRepository(User);
        const tokenRepository = getRepository(TokenModel);

        const userExists = await usersRepository.findOne({
            where: {
                email,
                deleted_at: null
            }
        });

        if(!userExists) {
            throw new Error('user not found.');
        }

        const passwordIsValid = await bcrypt.compare(password,userExists.password);

        if(!passwordIsValid) {
            throw new Error('user or password is invalid.');
        }
        
        const token = jwt.sign({ id:userExists.id },process.env.SECRET, {
            expiresIn: (60*60)*24
        })

        await tokenRepository.update(
            { user_id:userExists.id },
            {
                isvalid: false
            }
        );

        const newToken = tokenRepository.create({
            user_id: userExists.id,
            hash: token,
            isvalid: true
        });

        await tokenRepository.save(newToken);

        return { token }

    }
}

export default AuthLoginService;