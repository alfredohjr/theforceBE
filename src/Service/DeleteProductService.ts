import { Equal, getConnection, getRepository, Not } from "typeorm";
import Document from "../models/Document";
import DocumentProduct from "../models/DocumentProduct";
import Product from "../models/Product";
import ProductLog from "../models/ProductLog";
import ProductPrice from "../models/ProductPrice";
import Stock from "../models/Stock";
import CreateProductLogService from "./CreateProductLogService";

import AppError from '../errors/AppError';

interface Request {
    id: string;
    user_id: string;
}

class DeleteProductService {
    public async execute({id, user_id}: Request): Promise<void> {
        const productRepository = getRepository(Product);
        const stockRepository = getRepository(Stock);
        const productPriceRepository = getRepository(ProductPrice);

        const productExists = await productRepository.findOne(id);

        if(!productExists) {
            throw new AppError('product not found');
        }

        const stockIsDifferentOf0 = await stockRepository.findOne({
            where: {
                product_id: id,
                amount: Not(Equal(0))
            }
        })

        if(stockIsDifferentOf0) {
            throw new AppError('find product stock, delete abort');
        }

        const isOpenDocument1 = getRepository(Document)
            .createQueryBuilder('documents')
            .select('documents.id')
            .where('documents.closed_at is null')
            .andWhere('documents.deleted_at is null')
        
        const isOpenDocument = await getConnection()
            .createQueryBuilder()
            .select('id')
            .from(DocumentProduct,'docprod')
            .where('docprod.document_id in (' + isOpenDocument1.getQuery() + ')')
            .andWhere('docprod.product_id = :id',{id})
            .getMany();

        if(isOpenDocument.length !== 0) {
            throw new AppError('find open document for this product, delete abort');
        }

        await productRepository.update(productExists.id,{
            deleted_at: new Date()
        });

        const productLog = new CreateProductLogService();
        await productLog.execute({
            user_id: user_id,
            product_id: id,
            code: `delete`,
            message: `{service:'delete'}`
        });

    }
}

export default DeleteProductService;