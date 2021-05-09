import { getRepository } from 'typeorm';
import Document from '../models/Document';
import DocumentLog from '../models/DocumentLog';

interface Request {
    id: string;
    user_id: string;
};

class DeleteDocumentService {
    public async execute({id, user_id}: Request): Promise<void> {

        const documentRepository = getRepository(Document);
        const documentLogRepository = getRepository(DocumentLog);

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

        const documentlog = documentLogRepository.create({
            user_id,
            document_id: id,
            code: 'DELETE',
            message: `{delete:'${id}'}`
        });

        await documentLogRepository.save(documentlog);

    }
}

export default DeleteDocumentService;