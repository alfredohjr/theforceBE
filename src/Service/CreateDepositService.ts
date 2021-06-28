import { getRepository } from "typeorm";
import Deposit from "../models/Deposit";

import AppError from '../errors/AppError';

interface Request {
    name: string;
    user_id: string;
}

class CreateDepositService {
    public async execute({name, user_id}: Request) : Promise<Deposit> {

        if(name.length < 10) {
            throw new AppError('minumum size of name is 10');
        }

        const depositRepository = getRepository(Deposit);

        const depositExists = await depositRepository.findOne({
            where: {
                name
            }
        });

        if(depositExists) {
            throw new AppError('deposit already exist');
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