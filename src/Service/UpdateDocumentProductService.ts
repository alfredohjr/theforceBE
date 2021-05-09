import { getRepository } from 'typeorm';
import DocumentProduct from '../models/DocumentProduct';
import DocumentLog from "../models/DocumentLog";

interface Request {
    id: string;
    user_id: string;
    value: number;
    amount: number;
}

class UpdateDocumentProductService {
    public async execute({id, user_id, value, amount}: Request): Promise<DocumentProduct> {
        const documentproductRepository = getRepository(DocumentProduct);

        const documentproductExists = await documentproductRepository.findOne(id);

        if(!documentproductExists) {
            throw new Error('document product not found');
        }

        await documentproductRepository.update(documentproductExists.id,{
            value: value ? value : documentproductExists.value,
            amount: amount ? amount : documentproductExists.amount
        });

        const documentLogRepository = getRepository(DocumentLog);

        const documentLog = documentLogRepository.create({
            user_id: user_id,
            document_id: documentproductExists.document_id,
            code: `UPDATE DOCUMENTPRODUCT`,
            message: `{service:'update',value: {from:'${documentproductExists.value}',to:'${value}'}, amount: {from: ${documentproductExists},to: ${amount}}}`
        });

        await documentLogRepository.save(documentLog);

        const documentproduct = await documentproductRepository.findOne(id);

        return documentproduct ? documentproduct : documentproductExists;
    }
}

export default UpdateDocumentProductService;