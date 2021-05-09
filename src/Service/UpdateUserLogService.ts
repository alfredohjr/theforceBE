interface Request {
    id: string;
}

class UpdateUserLogService {
    public async execute({id}: Request): Promise<void> {
        throw new Error('is not possible to alter log data');
    }
}

export default UpdateUserLogService;