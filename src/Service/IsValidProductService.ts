import { getRepository } from "typeorm";
import Product from "../models/Product";

interface Request {
    id: string;
}

class IsValidProductService {
    public async execute({id}: Request): Promise<Product> {
        const productRepository = getRepository(Product);
    
        const productExists = await productRepository.findOne(id);

        if(!productExists) {
            throw new Error('product not found')
        }

        if(productExists.deleted_at) {
            throw new Error('product is inactive')
        }

        return productExists

    }

}

export default IsValidProductService;