import { getRepository } from 'typeorm';
import DocumentProduct from '../models/DocumentProduct';

import AppError from '../errors/AppError';

interface Request {
    id: string;
};

class IsValidDocumentProductService {
    public async execute({id}:Request): Promise<void> {
        const documentproductRepository = getRepository(DocumentProduct);

        const documentproductExists = await documentproductRepository.findOne({
            where: {
                id
            }
        });

        if(!documentproductExists) {
            throw new AppError('document product not found');
        }

        if(documentproductExists.deleted_at !== null) {
            throw new AppError('document product deleted');
        }

    }
}

export default IsValidDocumentProductService;
