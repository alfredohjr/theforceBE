
interface Request {
    id: string;
}

class UpdateStockMovementService {
    public async execute({id}: Request): Promise<void> {
        throw new Error('is not possible to update stock movement')
    }
}

export default UpdateStockMovementService;