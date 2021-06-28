import { getRepository } from 'typeorm';
import Stock from '../models/Stock';

import AppError from '../errors/AppError';

interface Request{
    user_id: string;
    deposit_id: string;
    product_id: string;
};

class CreateStockService {
    public async execute({user_id, deposit_id, product_id}:Request): Promise<Stock>{
        const stockRepository = getRepository(Stock);

        const stockExists = await stockRepository.find({
             where:{
                 deposit_id,
                 product_id,
                 deleted_at: null
             }
        });

        if(stockExists) {
            throw new AppError('stock already exists');
        };

        const stock = stockRepository.create({
            user_id,
            deposit_id,
            product_id,
            value: 0,
            amount: 0
        });

        await stockRepository.save(stock);

        return stock;
    }
}
export default CreateStockService;
