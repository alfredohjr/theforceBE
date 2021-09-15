import { getRepository } from 'typeorm';
import StockLog from '../../Models/StockLog';

interface Request{
    stock_id: string;
    user_id: string;
    code: string;
    message: string;
};

class CreateStockLogService {
    public async execute({stock_id, user_id, code, message}:Request): Promise<StockLog>{
        const stocklogRepository = getRepository(StockLog);

        const stocklog = stocklogRepository.create({
            stock_id,
            user_id,
            code,
            message
        });

        await stocklogRepository.save(stocklog);

        return stocklog;
    }
}
export default CreateStockLogService;
