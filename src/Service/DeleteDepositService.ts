import { getRepository } from "typeorm";
import Deposit from "../models/Deposit";

interface Request {
    id: string;
    user_id: string;
}

class DeleteDepositService {
    public async execute({id, user_id}: Request): Promise<void> {

        const depositRepository = getRepository(Deposit);

        const depositExists = await depositRepository.findOne({
            where: {
                id,
                deleted_at: null
            }
        });

        if(!depositExists) {
            throw new Error('deposit not found');
        }

        await depositRepository.update(depositExists.id,{
            deleted_at: new Date()
        });

    }
}

export default DeleteDepositService;