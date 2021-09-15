import { getRepository } from 'typeorm';
import DocumentProduct from '../../Models/DocumentProduct';

class GetDocumentProductService {
    public async execute(document_id:string): Promise<DocumentProduct[]> {
        const documentproductRepository = getRepository(DocumentProduct);

        const documentproducts = await documentproductRepository.find({
            where: {
                deleted_at: null,
                document_id: document_id
            }
        });

        return documentproducts;
    }
}

export default GetDocumentProductService;
