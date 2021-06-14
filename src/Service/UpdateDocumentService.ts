import { getRepository } from 'typeorm';
import Document from '../models/Document';
import CreateDocumentLogService from './CreateDocumentLogService';

interface Request {
    id: string;
    user_id: string;
    key?: string;
}

class UpdateDocumentService {
    public async execute({id, user_id, key}: Request): Promise<Document> {
        const documentRepository = getRepository(Document);

        const documentExists = await documentRepository.findOne(id);

        if(!documentExists) {
            throw new Error('document not found');
        }

        await documentRepository.update(documentExists.id,{
            key: key ? key : documentExists.key
        });

        const documentLog = new CreateDocumentLogService();
        await documentLog.execute({
            user_id: user_id,
            document_id: id,
            code: `UPDATE`,
            message: `{service:'update',key: {from:'${documentExists.key}',to:'${key}'}`
        });

        const document = await documentRepository.findOne(id);

        return document ? document : documentExists;
    }
}

export default UpdateDocumentService;