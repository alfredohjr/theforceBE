import AppError from '../errors/AppError';

interface Request {
    id: string;
};

class DeleteDepositLogService {
    public async execute({id}: Request): Promise<void> {

        throw new AppError('for delete deposit logs, contact administrator')

    }
}

export default DeleteDepositLogService;