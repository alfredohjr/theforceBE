import { getRepository } from 'typeorm';

import Product from '../models/Product';
import ProductLog from '../models/ProductLog';

interface Request {
    name: string;
    user_id: string;
}


class CreateProductService {
    public async execute({name, user_id}: Request): Promise<Product> {

        if(name.length < 10) {
            throw new Error('minumum size of name is 10');
        }
        
        if(!(name || user_id)) {
            throw new Error('please, send name of product')
        }

        const productRepository = getRepository(Product);

        const checkProductExist = await productRepository.findOne({
            where: {
                name: name
            }
        });

        if(checkProductExist) {
            throw new Error('duplicate name');
        }

        const product = productRepository.create({
            name,
            user_id
        });


        await productRepository.save(product);

        const productLogRepository = getRepository(ProductLog);

        const productLog = productLogRepository.create({
            product_id: product.id,
            user_id: user_id,
            code: `Create`,
            message: `{service: 'create',originalName: '${name}'}`
        });

        await productLogRepository.save(productLog);

        return product;
    }
}

export default CreateProductService;
