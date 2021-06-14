import { getRepository } from 'typeorm';
import DocumentLog from '../models/DocumentLog';

class GetDocumentLogService {
    public async execute(document_id: string): Promise<DocumentLog[]> {
        const documentlogRepository = getRepository(DocumentLog);

        const documentlogs = await documentlogRepository.find({
            where: {
                deleted_at: null,
                document_id
            }
        });

        return documentlogs;
    }
}

export default GetDocumentLogService;
