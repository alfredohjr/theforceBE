import AppError from '../../../theforceBE/errors/AppError';

interface Request {
    id: string;
};

class DeleteProductLogService {
    public async execute({id}: Request): Promise<void> {
        throw new AppError('for delete product logs, contact administrator')
    }
}

export default DeleteProductLogService;