// TODO:empty

import { getRepository } from 'typeorm';
import StockMovement from '../models/StockMovement';

interface Request{
    document_id: string;
    deposit_id: string;
    product_id: string;
    user_id: string;
    value: number;
    type: 'in' | 'out';
};

class CreateStockMovementService {
    public async execute({document_id, deposit_id, product_id, value, type, user_id}:Request): Promise<StockMovement>{
        const stockmovementRepository = getRepository(StockMovement);

        const stockmovementExists = await stockmovementRepository.find({
             where:{
                 document_id,
                 deposit_id,
                 product_id
             }
        });

        if(stockmovementExists) {
            throw new Error('stock movement already exists');
        };

        const stockmovement = stockmovementRepository.create({
            document_id, 
            deposit_id, 
            product_id, 
            value, 
            type, 
            user_id
        });

        await stockmovementRepository.save(stockmovement);

        return stockmovement;
    }
}
export default CreateStockMovementService;
