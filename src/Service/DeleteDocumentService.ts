import { getRepository } from 'typeorm';
import Document from '../models/Document';
import DocumentLog from '../models/DocumentLog';
import CreateDocumentLogService from './CreateDocumentLogService';

interface Request {
    id: string;
    user_id: string;
};

class DeleteDocumentService {
    public async execute({id, user_id}: Request): Promise<void> {

        const documentRepository = getRepository(Document);

        const documentExists = await documentRepository.findOne({
            where: {
                id,
                deleted_at: null
            }
        });

        if(!documentExists) {
            throw new Error('document not found');
        }

        await documentRepository.update(documentExists.id,{
            deleted_at: new Date()
        });

        const documentLog = new CreateDocumentLogService();
        await documentLog.execute({
            user_id,
            document_id: id,
            code: 'DELETE',
            message: `{delete:'${id}'}`
        });

    }
}

export default DeleteDocumentService;