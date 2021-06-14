import { getRepository } from 'typeorm';
import Document from '../models/Document';

class GetDocumentService {
    public async execute(): Promise<Document[]> {
        const documentRepository = getRepository(Document);

        const documents = await documentRepository.find({
            where: {
                deleted_at: null,
                closed_at: null,
            }
        });

        return documents;
    }
}

export default GetDocumentService;
