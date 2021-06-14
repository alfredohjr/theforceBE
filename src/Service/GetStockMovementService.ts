import { getRepository } from 'typeorm';
import StockMovement from '../models/StockMovement';

interface Request {
    deposit_id: string;
    product_id: string;
}

class GetStockMovementService {
    public async execute({deposit_id, product_id}: Request): Promise<StockMovement[]> {
        const stockmovementRepository = getRepository(StockMovement);

        const stockmovements = await stockmovementRepository.find({
            where: {
                deleted_at: null,
                deposit_id,
                product_id
            }
        });

        return stockmovements;
    }
}

export default GetStockMovementService;
