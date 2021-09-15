import { getRepository } from 'typeorm';
import StockLog from '../../Models/StockLog';

import AppError from '../../../theforceBE/errors/AppError';

interface Request {
    id: string;
};

class IsValidStockLogService {
    public async execute({id}:Request): Promise<void> {
        const stocklogRepository = getRepository(StockLog);

        const stocklogExists = await stocklogRepository.findOne({
            where: {
                id
            }
        });

        if(!stocklogExists) {
            throw new AppError('stocklog not found');
        }

    }
}

export default IsValidStockLogService;
