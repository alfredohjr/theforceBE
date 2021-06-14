import { getRepository } from 'typeorm';
import StockMovement from '../models/StockMovement';
import StockLog from '../models/StockLog';
import CreateStockLogService from './CreateStockLogService';

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

        const stockLog = new CreateStockLogService();
        await stockLog.execute({
            stock_id: stockmovementExists.id,
            code: 'DELETE',
            message: `{delete:{document_id:'${id}'}}`,
            user_id
        });

    }
}

export default DeleteStockMovementService;