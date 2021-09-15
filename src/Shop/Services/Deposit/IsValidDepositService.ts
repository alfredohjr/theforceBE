import { getRepository } from "typeorm";
import Deposit from "../../Models/Deposit";

import AppError from '../../../theforceBE/errors/AppError';

interface Request {
    id: string;
}

class IsValidDepositService {
    public async execute({id}: Request): Promise<void> {
        const depositRepository = getRepository(Deposit);

        const depositExists = await depositRepository.findOne({
            where: {
                id
            }
        });

        if(!depositExists) {
            throw new AppError('deposit not found');
        }

        if(depositExists.deleted_at !== null) {
            throw new AppError('deposit inactive, please contact administrator for more information');
        }
    }
}

export default IsValidDepositService;