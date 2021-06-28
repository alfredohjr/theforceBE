import { getRepository } from 'typeorm';
import DocumentLog from '../models/DocumentLog';

import AppError from '../errors/AppError';

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
