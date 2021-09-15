import { getRepository } from "typeorm";
import Document from "../../Models/Document";

import AppError from '../../../theforceBE/errors/AppError';

interface Request {
    id: string;
}

class IsValidDocumentService {
    public async execute({id}:Request): Promise<void> {
        const documentRepository = getRepository(Document);

        const documentExists = await documentRepository.findOne({
            where: {
                id
            }
        });

        if(!documentExists) {
            throw new AppError('document not found');
        }

        if(documentExists.closed_at !== null) {
            throw new AppError('document is closed');
        }

        if(documentExists.deleted_at !== null) {
            throw new AppError('document deleted');
        }

        if(!['in','out'].includes(documentExists.type)) {
            throw new AppError('please, send in or out in type of document');
        }
    }
}

export default IsValidDocumentService;