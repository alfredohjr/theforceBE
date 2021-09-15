import { getRepository, Not } from 'typeorm';
import Document from '../../Models/Document';
import DocumentProduct from '../../Models/DocumentProduct';
import CreateDocumentLogService from '../DocumentLog/CreateDocumentLogService';

import AppError from '../../../theforceBE/errors/AppError';

interface Request {
    id: string;
    user_id: string;
};

class DeleteDocumentProductService {
    public async execute({id, user_id}: Request): Promise<void> {

        const documentproductRepository = getRepository(DocumentProduct);
        
        const documentproductExists = await documentproductRepository.findOne({
            where: {
                id,
                deleted_at: null
            }
        });

        if(!documentproductExists) {
            throw new AppError('document product not found');
        }

        const documentRepository = getRepository(Document);
        await documentRepository.findOne({
            where: {
                id: documentproductExists.document_id,
                closed_at: Not(null)
            }
        });

        if(documentRepository) {
            throw new AppError('Document is closed, delete is not possible');
        }

        await documentproductRepository.update(documentproductExists.id,{
            deleted_at: new Date()
        });

        const documentLog = new CreateDocumentLogService();
        await documentLog.execute({
            code:'DELETE',
            message: `{table:'document_product',delete:'${documentproductExists.document_id}',documentProduct:'${documentproductExists.id}'}`,
            document_id:documentproductExists.document_id,
            user_id
        })

    }
}

export default DeleteDocumentProductService;