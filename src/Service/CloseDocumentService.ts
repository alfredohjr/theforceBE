import { getRepository } from "typeorm";
import Document from "../models/Document";
import DocumentProduct from "../models/DocumentProduct";
import CreateStockMovementeService from "./CreateStockMovementeService";
import IsValidDepositService from "./IsValidDepositService";
import IsValidDocumentService from "./IsValidDocumentService";
import IsValidEntityService from "./IsValidEntityService";
import RegisterStockService from "./RegisterStockService";

interface Request {
    id: string;
    user_id: string;
}

class CloseDocumentService {
    public async execute({id, user_id}: Request): Promise<void> {
        const documentRepository = getRepository(Document);
        
        const isValidDocument = new IsValidDocumentService();
        await isValidDocument.execute({id});

        const document = await documentRepository.findOne({
            where: {
                id
            }
        });

        if(!document){
            throw new Error('document not found');
        }

        const isValidDeposit = new IsValidDepositService();
        await isValidDeposit.execute({id: document.deposit_id});

        const isValidEntity = new IsValidEntityService();
        await isValidEntity.execute({id: document.entity_id});

        const docProductRepository = getRepository(DocumentProduct);
        const docProducts = await docProductRepository.find({
            where: {
                document_id: id,
                deleted_at: null
            }
        });

        const createStockMovement = new CreateStockMovementeService();
        const registerStock = new RegisterStockService();

        var p: DocumentProduct;
        for(var i = 0; i < docProducts.length; i++){
            p = docProducts[i];
            await createStockMovement.execute({
                user_id,
                deposit_id: document.deposit_id,
                document_id: p.document_id,
                product_id: p.product_id,
                type: document.type,
                value: p.value,
                amount: p.amount
            });

            await registerStock.execute({
                deposit_id: document.deposit_id,
                product_id: p.product_id,
                type: document.type,
                value: p.value,
                amount: p.amount,
                user_id
            });
        }
        

        await documentRepository.update(id,{
            closed_at: new Date()
        });
    }
}

export default CloseDocumentService;