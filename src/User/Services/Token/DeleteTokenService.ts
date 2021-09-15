import AppError from '../../../theforceBE/errors/AppError';

interface Request {
    id: string;
};

class DeleteTokenService {
    public async execute({id}: Request): Promise<void> {
        throw new AppError('is not possible to delete token');
    }
}

export default DeleteTokenService;