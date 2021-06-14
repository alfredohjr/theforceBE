import { getRepository } from 'typeorm';
import User from '../models/User';

class GetUserService {
    public async execute(id: string): Promise<User[]> {
        const userRepository = getRepository(User);

        const users = await userRepository.find({
            where: {
                deleted_at: null,
                id
            }
        });

        return users;
    }
}

export default GetUserService;
