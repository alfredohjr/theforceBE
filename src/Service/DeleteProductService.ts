import { getRepository } from "typeorm";
import Product from "../models/Product";
import ProductLog from "../models/ProductLog";

interface Request {
    id: string;
    user_id: string;
}

class DeleteProductService {
    public async execute({id, user_id}: Request): Promise<void> {
        const productRepository = getRepository(Product);

        const productExists = await productRepository.findOne(id);

        if(!productExists) {
            throw new Error('product not found');
        }

        await productRepository.update(productExists.id,{
            deleted_at: new Date()
        });

        const productLogRepository = getRepository(ProductLog);

        const productLog = productLogRepository.create({
            user_id: user_id,
            product_id: id,
            code: `delete`,
            message: `{service:'delete'}`
        });

        await productLogRepository.save(productLog);

    }
}

export default DeleteProductService;