import { getRepository } from 'typeorm';
import StockMovement from '../models/StockMovement';

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
            throw new Error('stock movement not found');
        }

        if(stockmovementExists.deleted_at !== null) {
            throw new Error('stock movement deleted');
        }

    }
}

export default IsValidStockMovementService;
