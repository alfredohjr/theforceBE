import { Equal, getRepository, MoreThan, Not } from "typeorm";
import Deposit from "../../Models/Deposit";
import Document from "../../Models/Document";
import Stock from "../../Models/Stock";
import CreateDepositLogService from "../DepositLog/CreateDepositLogService";

import AppError from '../../../theforceBE/errors/AppError';

interface Request {
    id: string;
    user_id: string;
}

class DeleteDepositService {
    public async execute({id, user_id}: Request): Promise<void> {

        const depositRepository = getRepository(Deposit);
        const stockRepository = getRepository(Stock);
        const documentRepository = getRepository(Document)

        const depositExists = await depositRepository.findOne({
            where: {
                id,
                deleted_at: null
            }
        });

        if(!depositExists) {
            throw new AppError('deposit not found');
        }

        const stockIsDifferentOf0 = await stockRepository.findOne({
            where: {
                deposit_id: id,
                amount: Not(Equal(0)),
            }
        });

        if(stockIsDifferentOf0) {
            throw new AppError('find movement stock in deposit, delete abort');
        }

        const isOpenDocument = await documentRepository.findOne({
            where: {
                deposit_id: id,
                closed_at: null,
                deleted_at: null
            }
        });

        if(isOpenDocument) {
            throw new AppError('find open document for this deposit, delete abort');
        }

        await depositRepository.update(depositExists.id,{
            deleted_at: new Date()
        });

        const depositLog = new CreateDepositLogService();
        await depositLog.execute({
            code:'DELETE',
            message:`{delete:'${id}'}`,
            deposit_id:id,
            user_id
        });

    }
}

export default DeleteDepositService;