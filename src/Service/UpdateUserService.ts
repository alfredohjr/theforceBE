import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';

import User from '../models/User';

interface Request {
    name?: string;
    email: string;
    password: string;
    newPassword?: string;
}

class UpdateUserService {
    public async execute({name, email, password, newPassword}:Request): Promise<User | undefined> {
        if(!(password)) {
            throw new Error('Please, send password.');
        }

        const usersRepository = getRepository(User);

        const userExists = await usersRepository.findOne({
            where: {
                email: email
            }
        })

        if(!userExists) {
            throw new Error('user not found');
        }

        const salt = await bcrypt.genSalt(8);

        await usersRepository.update(userExists.id,{
            name: name ? name : userExists.name,
            email,
            password: newPassword ? bcrypt.hashSync(newPassword,salt) : userExists.password 
        })

        const user = await usersRepository.findOne({
            where: {
                email: email
            }
        });

        return user;
    }
}

export default UpdateUserService;