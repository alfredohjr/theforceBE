import AppError from '../../../theforceBE/errors/AppError';

interface Request {
    id: string;
};

class DeleteStockLogService {
    public async execute({id}: Request): Promise<void> {
        throw new AppError('for delete stock logs, contact administrator')
    }
}

export default DeleteStockLogService;