interface Request {
    id: string;
};

class DeleteProductLogService {
    public async execute({id}: Request): Promise<void> {
        throw new Error('for delete product logs, contact administrator')
    }
}

export default DeleteProductLogService;