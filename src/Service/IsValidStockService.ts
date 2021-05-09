import { getRepository } from 'typeorm';
import Stock from '../models/Stock';

interface Request {
    id: string;
};

class IsValidStockService {
    public async execute({id}:Request): Promise<void> {
        const stockRepository = getRepository(Stock);

        const stockExists = await stockRepository.findOne({
            where: {
                id
            }
        });

        if(!stockExists) {
            throw new Error('stock not found');
        }

        if(stockExists.deleted_at !== null) {
            throw new Error('stock deleted');
        }

    }
}

export default IsValidStockService;
