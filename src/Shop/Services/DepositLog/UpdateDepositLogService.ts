import AppError from '../../../theforceBE/errors/AppError';

interface Request {
    id: string;
}

class UpdateDepositLogService {
    public async execute({id}: Request): Promise<void> {
        throw new AppError('is not possible to alter log data');
    }
}

export default UpdateDepositLogService;