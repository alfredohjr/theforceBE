import AppError from '../errors/AppError';

interface Request {
    id: string;
}

class UpdateEntityLogService {
    public async execute({id}: Request): Promise<void> {
        throw new AppError('is not possible to alter log data');
    }
}

export default UpdateEntityLogService;