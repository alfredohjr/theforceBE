import { getRepository } from 'typeorm';
import DocumentLog from '../../Models/DocumentLog';

import AppError from '../../../theforceBE/errors/AppError';

interface Request {
    id: string;
};

class IsValidDocumentLogService {
    public async execute({id}:Request): Promise<void> {
        const documentlogRepository = getRepository(DocumentLog);

        const documentlogExists = await documentlogRepository.findOne({
            where: {
                id
            }
        });

        if(!documentlogExists) {
            throw new AppError('documentlog not found');
        }

    }
}

export default IsValidDocumentLogService;
