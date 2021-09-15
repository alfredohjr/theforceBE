import { getRepository } from "typeorm";
import StockMovement from "../../Models/StockMovement";

import AppError from '../../../theforceBE/errors/AppError';

interface Request {
    user_id:string; 
    deposit_id:string;
    document_id:string;
    product_id:string;
    type:'in' | 'out';
    value:number;
    amount: number;
}

class CreateStockMovementService {
    public async execute({
        user_id, 
        deposit_id, 
        document_id, 
        product_id, 
        type, 
        value,
        amount}: Request): Promise<void> {

        const stockMovementRepository = getRepository(StockMovement);

        if(value < 0) {
            throw new AppError('negative value not allowed');
        }

        if(amount < 0) {
            throw new AppError('negative amount not allowed');
        }

        const stockMovExists = await stockMovementRepository.findOne({
            where: {
                document_id,
                deposit_id,
                product_id,
                deleted_at: null
            }
        });

        if(stockMovExists) {
            throw new AppError('moviment already exists');
        }

        const stockMov = stockMovementRepository.create({
            value,
            amount,
            type, 
            deposit_id, 
            product_id, 
            user_id, 
            document_id
        });

        await stockMovementRepository.save(stockMov);

    }
}

export default CreateStockMovementService;