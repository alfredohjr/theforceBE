import { getRepository } from "typeorm";
import Product from "../models/Product";
import IsValidProductService from "./IsValidProductService";

interface Request {
    id?: string;
}

class GetProductService {
    public async execute({id}: Request): Promise<Product[] | Product> {
        const productRepository = getRepository(Product);

        if(id) {
            const isValidProduct = new IsValidProductService();
            const product = await isValidProduct.execute({id});
            return product;
        }

        const validProducts = await productRepository.find({
            where: {
                deleted_at: null
            }
        });

        return validProducts;
    }
}

export default GetProductService;