import { getRepository } from 'typeorm';
import StockLog from '../models/StockLog';

interface Request {
    id: string;
}

class UpdateStockLogService {
    public async execute({id}: Request): Promise<StockLog> {
        throw new Error('is not possible to alter log data');
    }
}

export default UpdateStockLogService;