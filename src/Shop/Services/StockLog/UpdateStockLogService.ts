import StockLog from '../../Models/StockLog';

import AppError from '../../../theforceBE/errors/AppError';

interface Request {
    id: string;
}

class UpdateStockLogService {
    public async execute({id}: Request): Promise<StockLog> {
        throw new AppError('is not possible to alter log data');
    }
}

export default UpdateStockLogService;