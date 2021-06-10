import { getRepository } from "typeorm";
import StockMovement from "../models/StockMovement";

interface Request {
    user_id:string; 
    deposit_id:string;
    document_id:string;
    product_id:string;
    type:'in' | 'out';
    value:number;
    amount: number;
}

class CreateStockMovementeService {
    public async execute({
        user_id, 
        deposit_id, 
        document_id, 
        product_id, 
        type, 
        value,
        amount}: Request): Promise<void> {

        const stockMovementRepository = getRepository(StockMovement);

        const stockMovExists = await stockMovementRepository.findOne({
            where: {
                document_id,
                deposit_id,
                product_id
            }
        });

        if(stockMovExists) {
            throw new Error('moviment already exists');
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

export default CreateStockMovementeService;