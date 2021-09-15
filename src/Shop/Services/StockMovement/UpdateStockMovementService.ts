import AppError from '../../../theforceBE/errors/AppError';

interface Request {
    id: string;
}

class UpdateStockMovementService {
    public async execute({id}: Request): Promise<void> {
        throw new AppError('is not possible to update stock movement')
    }
}

export default UpdateStockMovementService;