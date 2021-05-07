interface Request {
    id: string;
};

class DeleteDepositLogService {
    public async execute({id}: Request): Promise<void> {

        throw new Error('for delete deposit logs, contact administrator')

    }
}

export default DeleteDepositLogService;