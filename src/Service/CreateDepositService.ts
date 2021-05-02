import { getRepository } from "typeorm";
import Deposit from "../models/Deposit";

interface Request {
    name: string;
    user_id: string;
}

class CreateDepositService {
    public async execute({name, user_id}: Request) : Promise<Deposit> {
        const depositRepository = getRepository(Deposit);

        const depositExists = await depositRepository.findOne({
            where: {
                name
            }
        });

        if(depositExists) {
            throw new Error('deposit already exist');
        }

        const deposit = depositRepository.create({
            name,
            user_id
        });

        await depositRepository.save(deposit);

        return deposit;
    }
}

export default CreateDepositService;