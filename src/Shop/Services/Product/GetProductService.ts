import { getRepository } from "typeorm";
import Product from "../../Models/Product";
import IsValidProductService from "./IsValidProductService";

interface Request {
    id?: string;
}

class GetProductService {
    public async execute({id}: Request): Promise<Product[] | Product | any> {
        const productRepository = getRepository(Product);

        if(id) {
            const isValidProduct = new IsValidProductService();
            await isValidProduct.execute({id});

            const product = await productRepository.findOne({
                where: {
                    id
                }
            })

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