import { getRepository } from 'typeorm';
import Stock from '../models/Stock';
import CreateStockLogService from './CreateStockLogService';

import AppError from '../errors/AppError';

interface Request {
    id: string;
    user_id: string;
    value: number;

}

class UpdateStockService {
    public async execute({id, user_id, value}: Request): Promise<Stock> {
        const stockRepository = getRepository(Stock);

        if(value < 0) {
            throw new AppError('negative value not allowed');
        }

        const stockExists = await stockRepository.findOne(id);

        if(!stockExists) {
            throw new AppError('stock not found');
        }

        await stockRepository.update(stockExists.id,{
            value: value ? value : stockExists.value,
        });

        const stockLog = new CreateStockLogService();
        await stockLog.execute({
            user_id: user_id,
            stock_id: id,
            code: `update`,
            message: `{service:'UpdateStockService', value: {from:'${stockExists.value}',to:'${value}'}`
        });

        const stock = await stockRepository.findOne(id);

        return stock ? stock : stockExists;
    }
}

export default UpdateStockService;