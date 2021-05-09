import { getRepository } from 'typeorm';
import Stock from '../models/Stock';
import StockLog from '../models/StockLog';

interface Request {
    id: string;
    user_id: string;
    value: number;
}

class UpdateStockService {
    public async execute({id, user_id, value}: Request): Promise<Stock> {
        const stockRepository = getRepository(Stock);

        const stockExists = await stockRepository.findOne(id);

        if(!stockExists) {
            throw new Error('stock not found');
        }

        await stockRepository.update(stockExists.id,{
            value: value ? value : stockExists.value
        });

        const stockLogRepository = getRepository(StockLog);

        const stockLog = stockLogRepository.create({
            user_id: user_id,
            stock_id: id,
            code: `update`,
            message: `{service:'update',value: {from:'${stockExists.value}',to:'${value}'}`
        });

        await stockLogRepository.save(stockLog);

        const stock = await stockRepository.findOne(id);

        return stock ? stock : stockExists;
    }
}

export default UpdateStockService;