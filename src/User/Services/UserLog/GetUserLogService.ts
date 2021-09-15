import { getRepository } from 'typeorm';
import UserLog from '../../Models/UserLog';

class GetUserLogService {
    public async execute(user_id: string): Promise<UserLog[]> {
        const userlogRepository = getRepository(UserLog);

        const userlogs = await userlogRepository.find({
            where: {
                deleted_at: null,
                user_id
            }
        });

        return userlogs;
    }
}

export default GetUserLogService;
