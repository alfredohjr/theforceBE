import { getRepository } from "typeorm";
import Product from "../models/Product";

import AppError from '../errors/AppError';

interface Request {
    id: string;
}

class IsValidProductService {
    public async execute({id}: Request): Promise<void> {
        const productRepository = getRepository(Product);
    
        const productExists = await productRepository.findOne(id);

        if(!productExists) {
            throw new AppError('product not found')
        }

        if(productExists.deleted_at) {
            throw new AppError('product is inactive')
        }

    }

}

export default IsValidProductService;