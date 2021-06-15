import { getRepository } from "typeorm";
import Product from "../models/Product";
import CreateProductLogService from "./CreateProductLogService";

interface Request {
    id: string;
    user_id: string;
    name: string;
}

class UpdateProductService {
    public async execute({id, user_id, name}: Request): Promise<Product> {

        if(name.length < 10) {
            throw new Error('minumum size of name is 10');
        }

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

        const productLog = new CreateProductLogService();
        await productLog.execute({
            user_id: user_id,
            product_id: id,
            code: `update`,
            message: `{service:'update',name: {from:'${name}',to:'${productExists.name}'}}`
        });

        const product = await productRepository.findOne(id);

        return product ? product : productExists;
    }
}

export default UpdateProductService;