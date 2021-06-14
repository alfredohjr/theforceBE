import { getRepository } from 'typeorm';
import ProductPrice from '../models/ProductPrice';

interface Request {
    id: string;
};

class IsValidProductPriceService {
    public async execute({id}:Request): Promise<void> {
        const productpriceRepository = getRepository(ProductPrice);

        const productpriceExists = await productpriceRepository.findOne({
            where: {
                id
            }
        });

        if(!productpriceExists) {
            throw new Error('productprice not found');
        }

        if(productpriceExists.deleted_at !== null) {
            throw new Error('productprice deleted');
        }

    }
}

export default IsValidProductPriceService;
