import { getRepository } from "typeorm";
import bcrypt from 'bcrypt';

import User from "../models/User";

import AppError from '../errors/AppError';

interface Request {
    email: string;
    password: string;
}

class IsValidUserPasswordService {
    public async execute({email, password}: Request): Promise<void> {

        if(!(email || password)) {
            throw new AppError('please, send email and password.');
        }

        const usersRepository = getRepository(User);

        const userExists = await usersRepository.findOne({
            where: {
                email
            }
        });

        if(!userExists) {
            throw new AppError('user not found.');
        }

        const passwordIsValid = await bcrypt.compare(password,userExists.password);

        if(!passwordIsValid) {
            throw new AppError('user or password is invalid.');
        }

    }
}

export default IsValidUserPasswordService;