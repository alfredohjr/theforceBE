import { getRepository } from 'typeorm';
import Stock from '../../Models/Stock';

import AppError from '../../../theforceBE/errors/AppError';

interface Request {
    id: string;
};

class IsValidStockService {
    public async execute({id}:Request): Promise<void> {
        const stockRepository = getRepository(Stock);

        const stockExists = await stockRepository.findOne({
            where: {
                id
            }
        });

        if(!stockExists) {
            throw new AppError('stock not found');
        }

        if(stockExists.deleted_at !== null) {
            throw new AppError('stock deleted');
        }

    }
}

export default IsValidStockService;
