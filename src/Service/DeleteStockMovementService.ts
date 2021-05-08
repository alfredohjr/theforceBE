import { getRepository } from 'typeorm';
import StockMovement from '../models/StockMovement';
import StockLog from '../models/StockLog';

interface Request {
    id: string;
    user_id: string;
};

class DeleteStockMovementService {
    public async execute({id, user_id}: Request): Promise<void> {

        const stockmovementRepository = getRepository(StockMovement);
        const stockLogRepository = getRepository(StockLog);

        const stockmovementExists = await stockmovementRepository.findOne({
            where: {
                id,
                deleted_at: null
            }
        });

        if(!stockmovementExists) {
            throw new Error('stock movement not found');
        }

        await stockmovementRepository.update(stockmovementExists.id,{
            deleted_at: new Date()
        });

        const stocklog = stockLogRepository.create({
            deposit_id: stockmovementExists.deposit_id,
            product_id: stockmovementExists.product_id,
            user_id,
            code: 'DELETE',
            message: `{delete:{document_id:'${id}'}}`
        });

        await stockLogRepository.save(stocklog);

    }
}

export default DeleteStockMovementService;