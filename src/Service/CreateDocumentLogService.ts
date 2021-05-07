import { getRepository } from 'typeorm';
import DocumentLog from '../models/DocumentLog';

interface Request{
    document_id: string;
    code: string;
    message: string;
    user_id: string;
};

class CreateDocumentLogService {
    public async execute({document_id, code, message, user_id}:Request): Promise<DocumentLog>{
        const documentlogRepository = getRepository(DocumentLog);

        const documentlog = documentlogRepository.create({
            document_id,
            code,
            message,
            user_id
        });

        await documentlogRepository.save(documentlog);

        return documentlog;
    }
}
export default CreateDocumentLogService;
