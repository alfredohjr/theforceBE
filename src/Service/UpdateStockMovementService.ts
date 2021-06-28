import AppError from '../errors/AppError';

interface Request {
    id: string;
}

class UpdateStockMovementService {
    public async execute({id}: Request): Promise<void> {
        throw new AppError('is not possible to update stock movement')
    }
}

export default UpdateStockMovementService;