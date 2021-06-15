import { getRepository } from "typeorm";
import DocumentProduct from "../models/DocumentProduct";

interface Request {
    user_id: string; 
    document_id: string; 
    product_id: string; 
    value: number; 
    amount: number;
}

class CreateDocumentProductService {
    public async execute({user_id, document_id, product_id, value, amount}: Request): Promise<DocumentProduct> {
        const documentProductRepository = getRepository(DocumentProduct);

        if(value < 0) {
            throw new Error('negative value not allowed');
        }

        if(amount < 0) {
            throw new Error('negative amount not allowed');
        }

        const docProdExists = await documentProductRepository.findOne({
            where: {
                document_id,
                product_id,
                deleted_at: null
            }
        });

        if(docProdExists) {
            throw new Error('product already exists in the document');
        }

        const docProduct = documentProductRepository.create({
            user_id,
            document_id,
            product_id,
            value,
            amount
        });

        await documentProductRepository.save(docProduct);

        return docProduct;
    }
}

export default CreateDocumentProductService;