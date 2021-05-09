interface Request {
    id: string;
};

class DeleteUserLogService {
    public async execute({id}: Request): Promise<void> {
        throw new Error('delete user log is not possible');
    }
}

export default DeleteUserLogService;