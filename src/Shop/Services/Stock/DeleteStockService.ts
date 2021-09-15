import { getRepository } from 'typeorm';
import Stock from '../../Models/Stock';
import CreateStockLogService from '../StockLog/CreateStockLogService';

import AppError from '../../../theforceBE/errors/AppError';

interface Request {
    id: string;
    user_id: string;
};

class DeleteStockService {
    public async execute({id, user_id}: Request): Promise<void> {

        const stockRepository = getRepository(Stock);

        const stockExists = await stockRepository.findOne({
            where: {
                id,
                deleted_at: null
            }
        });

        if(!stockExists) {
            throw new AppError('stock not found');
        }

        if(stockExists.value !== 0) {
            throw new AppError(`stock value of ${id} is ${stockExists.value}, is not possible to delete it.`);
        }

        await stockRepository.update(stockExists.id,{
            deleted_at: new Date()
        });

        const stockLog = new CreateStockLogService();
        await stockLog.execute({
            user_id,
            stock_id: id,
            code: 'DELETE',
            message: `{delete:'${id}'}`
        });

    }
}

export default DeleteStockService;