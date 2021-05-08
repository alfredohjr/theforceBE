interface Request {
    id: string;
};

class DeleteEntityLogService {
    public async execute({id}: Request): Promise<void> {
        throw new Error('for delete document logs, contact administrator');
    }
}

export default DeleteEntityLogService;