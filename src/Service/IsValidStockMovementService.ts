import { getRepository } from 'typeorm';
import StockMovement from '../models/StockMovement';

import AppError from '../errors/AppError';

interface Request {
    id: string;
};

class IsValidStockMovementService {
    public async execute({id}:Request): Promise<void> {
        const stockmovementRepository = getRepository(StockMovement);

        const stockmovementExists = await stockmovementRepository.findOne({
            where: {
                id
            }
        });

        if(!stockmovementExists) {
            throw new AppError('stock movement not found');
        }

        if(stockmovementExists.deleted_at !== null) {
            throw new AppError('stock movement deleted');
        }

    }
}

export default IsValidStockMovementService;
