import { getRepository } from "typeorm";
import Product from "../models/Product";
import ProductLog from "../models/ProductLog";

interface Request {
    id: string;
    user_id: string;
    name?: string;
}

class UpdateProductService {
    public async execute({id, user_id, name}: Request): Promise<Product> {
        const productRepository = getRepository(Product);

        const productExists = await productRepository.findOne(id);

        if(!productExists) {
            throw new Error('product not found');
        }

        if(!(name)) {
            throw new Error('please, send name for update');
        }

        await productRepository.update(productExists.id,{
            name: name ? name : productExists.name
        });

        const productLogRepository = getRepository(ProductLog);

        const productLog = productLogRepository.create({
            user_id: user_id,
            product_id: id,
            code: `update`,
            message: `{service:'update',name: {from:'${name}',to:'${productExists.name}'}}`
        });

        await productLogRepository.save(productLog);

        const product = await productRepository.findOne(id);

        return product ? product : productExists;
    }
}

export default UpdateProductService;