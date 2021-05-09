// TODO:empty

import { getRepository } from 'typeorm';
import DocumentProduct from '../models/DocumentProduct';
import DocumentLog from '../models/DocumentLog';

interface Request {
    id: string;
    user_id: string;
};

class DeleteDocumentProductService {
    public async execute({id, user_id}: Request): Promise<void> {

        const documentproductRepository = getRepository(DocumentProduct);
        const documentLogRepository = getRepository(DocumentLog);

        const documentproductExists = await documentproductRepository.findOne({
            where: {
                id,
                deleted_at: null
            }
        });

        if(!documentproductExists) {
            throw new Error('document product not found');
        }

        await documentproductRepository.update(documentproductExists.id,{
            deleted_at: new Date()
        });

        const documentproductlog = documentLogRepository.create({
            user_id,
            document_id: documentproductExists.document_id,
            code: 'DELETE DOCUMENTPRODUCTS',
            message: `{delete:'${documentproductExists.document_id}',documentProduct:'${documentproductExists.id}'}`
        });

        await documentLogRepository.save(documentproductlog);

    }
}

export default DeleteDocumentProductService;