import { getRepository } from 'typeorm';
import StockLog from '../../Models/StockLog';


class GetStockLogService {
    public async execute(stock_id: string): Promise<StockLog[]> {
        const stocklogRepository = getRepository(StockLog);

        const stocklogs = await stocklogRepository.find({
            where: {
                deleted_at: null,
                stock_id
            }
        });

        return stocklogs;
    }
}

export default GetStockLogService;
