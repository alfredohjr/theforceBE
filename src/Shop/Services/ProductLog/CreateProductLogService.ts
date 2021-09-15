import { getRepository } from 'typeorm';
import ProductLog from '../../Models/ProductLog';

interface Request{
    product_id: string;
    code: string;
    message: string;
    user_id: string;
};

class CreateProductLogService {
    public async execute({product_id, code, message, user_id}:Request): Promise<ProductLog>{
        const productlogRepository = getRepository(ProductLog);

        const productlog = productlogRepository.create({
            product_id,
            code,
            message,
            user_id
        });

        await productlogRepository.save(productlog);

        return productlog;
    }
}
export default CreateProductLogService;
