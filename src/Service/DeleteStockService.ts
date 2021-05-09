// TODO:empty

import { getRepository } from 'typeorm';
import Stock from '../models/Stock';
import StockLog from '../models/StockLog';

interface Request {
    id: string;
    user_id: string;
};

class DeleteStockService {
    public async execute({id, user_id}: Request): Promise<void> {

        const stockRepository = getRepository(Stock);
        const stockLogRepository = getRepository(StockLog);

        const stockExists = await stockRepository.findOne({
            where: {
                id,
                deleted_at: null
            }
        });

        if(!stockExists) {
            throw new Error('stock not found');
        }

        if(stockExists.value !== 0) {
            throw new Error(`stock value of ${id} is ${stockExists.value}, is not possible to delete it.`);
        }

        await stockRepository.update(stockExists.id,{
            deleted_at: new Date()
        });

        const stocklog = stockLogRepository.create({
            user_id,
            stock_id: id,
            code: 'DELETE',
            message: `{delete:'${id}'}`
        });

        await stockLogRepository.save(stocklog);

    }
}

export default DeleteStockService;