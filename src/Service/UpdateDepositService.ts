import { getRepository } from "typeorm";
import Deposit from "../models/Deposit";

interface Request {
    id: string;
    name: string;
    user_id: string;
}

class UpdateDepositService {
    public async execute({id, name, user_id}: Request): Promise<Deposit> {
        const depositRepository = getRepository(Deposit);

        const depositExists = await depositRepository.findOne(id);

        if(!depositExists) {
            throw new Error('deposit not found');
        }

        const depositNameExists = await depositRepository.findOne({
            where: {
                name
            }
        });

        if(depositNameExists) {
            throw new Error('deposit same name found, please send other name');
        }

        await depositRepository.update(depositExists.id,{
            name: name ? name : depositExists.name
        });

        const deposit = await depositRepository.findOne(id);

        return deposit ? deposit : depositExists;
    }
}

export default UpdateDepositService;