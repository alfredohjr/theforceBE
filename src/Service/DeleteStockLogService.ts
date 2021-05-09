// TODO:empty

import { getRepository } from 'typeorm';
import StockLog from '../models/StockLog';

interface Request {
    id: string;
};

class DeleteStockLogService {
    public async execute({id}: Request): Promise<void> {
        throw new Error('for delete stock logs, contact administrator')
    }
}

export default DeleteStockLogService;