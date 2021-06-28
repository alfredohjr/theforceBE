import { getRepository } from 'typeorm';
import StockLog from '../models/StockLog';

import AppError from '../errors/AppError';

interface Request {
    id: string;
};

class DeleteStockLogService {
    public async execute({id}: Request): Promise<void> {
        throw new AppError('for delete stock logs, contact administrator')
    }
}

export default DeleteStockLogService;