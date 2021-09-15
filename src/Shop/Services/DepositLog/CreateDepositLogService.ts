import { getRepository } from 'typeorm';
import DepositLog from '../../Models/DepositLog';

interface Request{
    code: string;
    message: string;
    deposit_id: string;
    user_id: string;
};

class CreateDepositLogService {
    public async execute({code, message, deposit_id, user_id}:Request): Promise<DepositLog>{
        const depositlogRepository = getRepository(DepositLog);

        const depositlog = depositlogRepository.create({
            code,
            message,
            deposit_id,
            user_id
        });

        await depositlogRepository.save(depositlog);

        return depositlog;
    }
}

export default CreateDepositLogService;
