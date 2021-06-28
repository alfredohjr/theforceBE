import { getRepository } from "typeorm";
import Deposit from "../models/Deposit";
import CreateDepositLogService from "./CreateDepositLogService";

import AppError from '../errors/AppError';

interface Request {
    id: string;
    name: string;
    user_id: string;
}

class UpdateDepositService {
    public async execute({id, name, user_id}: Request): Promise<Deposit> {

        if(name.length < 10) {
            throw new AppError('minumum size of name is 10');
        }

        const depositRepository = getRepository(Deposit);

        const depositExists = await depositRepository.findOne(id);

        if(!depositExists) {
            throw new AppError('deposit not found');
        }

        const depositNameExists = await depositRepository.findOne({
            where: {
                name
            }
        });

        if(depositNameExists) {
            throw new AppError('deposit same name found, please send other name');
        }

        await depositRepository.update(depositExists.id,{
            name: name ? name : depositExists.name
        });

        const deposit = await depositRepository.findOne(id);

        const depositLog = new CreateDepositLogService();
        await depositLog.execute({
            deposit_id: depositExists.id,
            code: 'UPDATE',
            message: `{service:'UpdateDepositService',to:'${depositExists.name}',from:'${name}'}`,
            user_id
        });

        return deposit ? deposit : depositExists;
    }
}

export default UpdateDepositService;