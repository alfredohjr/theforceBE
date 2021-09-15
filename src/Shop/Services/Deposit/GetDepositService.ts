import { getRepository } from 'typeorm';
import Deposit from '../../Models/Deposit';

class GetDepositService {
    public async execute(): Promise<Deposit[]> {
        const depositRepository = getRepository(Deposit);

        const deposits = await depositRepository.find({
            where: {
                deleted_at: null
            }
        });

        return deposits;
    }
}

export default GetDepositService;
