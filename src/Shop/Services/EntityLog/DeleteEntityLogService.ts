import AppError from '../../../theforceBE/errors/AppError';

interface Request {
    id: string;
};

class DeleteEntityLogService {
    public async execute({id}: Request): Promise<void> {
        throw new AppError('for delete document logs, contact administrator');
    }
}

export default DeleteEntityLogService;