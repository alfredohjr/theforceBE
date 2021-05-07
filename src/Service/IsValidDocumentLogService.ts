import { getRepository } from 'typeorm';
import DocumentLog from '../models/DocumentLog';

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
            throw new Error('documentlog not found');
        }

    }
}

export default IsValidDocumentLogService;
