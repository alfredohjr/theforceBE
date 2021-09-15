import { getRepository } from 'typeorm';
import ProductLog from '../../Models/ProductLog';

class GetProductLogService {
    public async execute(product_id: string): Promise<ProductLog[]> {
        const productlogRepository = getRepository(ProductLog);

        const productlogs = await productlogRepository.find({
            where: {
                deleted_at: null,
                product_id
            }
        });

        return productlogs;
    }
}

export default GetProductLogService;
