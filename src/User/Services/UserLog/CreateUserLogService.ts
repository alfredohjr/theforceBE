import { getRepository } from 'typeorm';
import UserLog from '../../Models/UserLog';

interface Request{
    user_id: string;
    code: string;
    message: string;
};

class CreateUserLogService {
    public async execute({user_id, code, message}:Request): Promise<UserLog>{
        const userlogRepository = getRepository(UserLog);

        const userlog = userlogRepository.create({
            user_id,
            code,
            message
        });

        await userlogRepository.save(userlog);

        return userlog;
    }
}
export default CreateUserLogService;
