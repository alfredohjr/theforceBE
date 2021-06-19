import { getRepository, IsNull, NoNeedToReleaseEntityManagerError, Not, Raw } from "typeorm";
import Document from "../models/Document";
import DocumentProduct from "../models/DocumentProduct";
import Stock from "../models/Stock";
import StockMovement from "../models/StockMovement";
import CreateDocumentLogService from "./CreateDocumentLogService";
import IsValidDepositService from "./IsValidDepositService";
import IsValidEntityService from "./IsValidEntityService";

interface Request {
    id: string;
    user_id: string;
}

class ReOpenDocumentService {
    public async execute({id, user_id}: Request): Promise<void> {
        const documentRepository = getRepository(Document);
        
        const document = await documentRepository.findOne({
            where: {
                id,
                closed_at: Raw(alias => `${alias} is not null`),
                deleted_at: null
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

        const stockMovement = getRepository(StockMovement);
        const stock = getRepository(Stock);

        var p: DocumentProduct;
        for(var i = 0; i < docProducts.length; i++){
            p = docProducts[i];
            await stockMovement.update({
                deposit_id: document.deposit_id,
                document_id: p.document_id,
                product_id: p.product_id,
                type: document.type,
                value: p.value,
                amount: p.amount,
                deleted_at: IsNull()
            },{
                deleted_at: new Date()
            });

            var tmpAmount = 0;
            if(document.type === "in") {
                tmpAmount = p.amount * -1
            } else if (document.type === "out") {
                tmpAmount = p.amount
            } else {
                throw new Error("document type is not valid");
            }

            const stockExists = await stock.findOne({
                where: {
                    deposit_id: document.deposit_id,
                    product_id: p.product_id    
                }
            })

            if(stockExists){
                await stock.update(stockExists.id,{
                    amount: stockExists.amount + tmpAmount
                });
            }
        }
        
        console.log('cheguei aqui')
        await documentRepository.update(id,{
            closed_at: null,
        });

        const documentLog = new CreateDocumentLogService();
        await documentLog.execute({
            code: 'REOPEN',
            document_id: id,
            message:`{open:'${id}'}`,
            user_id,    
        });
    }
}

export default ReOpenDocumentService;