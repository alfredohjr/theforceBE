import AppError from '../errors/AppError';

interface Request {
    id: string;
};

class DeleteUserLogService {
    public async execute({id}: Request): Promise<void> {
        throw new AppError('delete user log is not possible');
    }
}

export default DeleteUserLogService;