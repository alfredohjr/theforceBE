import { getRepository } from 'typeorm';
import DepositLog from '../../Models/DepositLog';

class GetDepositLogService {
    public async execute(deposit_id: string): Promise<DepositLog[]> {
        const depositlogRepository = getRepository(DepositLog);

        const depositlogs = await depositlogRepository.find({
            where: {
                deleted_at: null,
                deposit_id
            }
        });

        return depositlogs;
    }
}

export default GetDepositLogService;
