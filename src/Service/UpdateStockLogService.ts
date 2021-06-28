import { getRepository } from 'typeorm';
import StockLog from '../models/StockLog';

import AppError from '../errors/AppError';

interface Request {
    id: string;
}

class UpdateStockLogService {
    public async execute({id}: Request): Promise<StockLog> {
        throw new AppError('is not possible to alter log data');
    }
}

export default UpdateStockLogService;