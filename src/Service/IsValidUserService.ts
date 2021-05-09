import { getRepository } from 'typeorm';
import User from '../models/User';

interface Request {
    id: string;
};

class IsValidUserService {
    public async execute({id}:Request): Promise<void> {
        const userRepository = getRepository(User);

        const userExists = await userRepository.findOne({
            where: {
                id
            }
        });

        if(!userExists) {
            throw new Error('user not found');
        }

        if(userExists.deleted_at !== null) {
            throw new Error('user deleted');
        }

    }
}

export default IsValidUserService;
