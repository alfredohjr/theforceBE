import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';

import User from '../models/User';

interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({ name, email, password}: Request): Promise<User> {

        if(name.length < 10) {
            throw new Error('minumum size of name is 10');
        }

        if(!(name || email || password)) {
            throw new Error('Please! send name, email and password!');
        }

        const usersRepository = getRepository(User);

        const checkUserExists = await usersRepository.findOne({
            where: {
                email
            }
        });

        if(checkUserExists){
            throw new Error('Email already used!');
        }

        const salt = await bcrypt.genSalt(8);
        const passwordHash = bcrypt.hashSync(password,salt);

        const user = usersRepository.create({
            name,
            email,
            password: passwordHash
        });

        await usersRepository.save(user);

        return user;
    }
}

export default CreateUserService;