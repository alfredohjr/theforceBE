import AppError from '../../../theforceBE/errors/AppError';

interface Request {
    id: string;
};

class DeleteDocumentLogService {
    public async execute({id}: Request): Promise<void> {
        throw new AppError('for delete document logs, contact administrator');
    }
}

export default DeleteDocumentLogService;