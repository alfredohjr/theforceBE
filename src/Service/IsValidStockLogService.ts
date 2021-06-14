import { getRepository } from 'typeorm';
import StockLog from '../models/StockLog';

interface Request {
    id: string;
};

class IsValidStockLogService {
    public async execute({id}:Request): Promise<void> {
        const stocklogRepository = getRepository(StockLog);

        const stocklogExists = await stocklogRepository.findOne({
            where: {
                id
            }
        });

        if(!stocklogExists) {
            throw new Error('stocklog not found');
        }

    }
}

export default IsValidStockLogService;
