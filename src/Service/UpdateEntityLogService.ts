interface Request {
    id: string;
}

class UpdateEntityLogService {
    public async execute({id}: Request): Promise<void> {
        throw new Error('is not possible to alter log data');
    }
}

export default UpdateEntityLogService;