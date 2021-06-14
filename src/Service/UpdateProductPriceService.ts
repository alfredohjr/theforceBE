import { getRepository } from 'typeorm';
import ProductPrice from '../models/ProductPrice';
import ProductLog from '../models/ProductLog';

interface Request {
    id: string;
    user_id: string;
    price: number;
}

class UpdateProductPriceService {
    public async execute({id, user_id, price}: Request): Promise<ProductPrice> {
        const productpriceRepository = getRepository(ProductPrice);

        const productpriceExists = await productpriceRepository.findOne(id);

        if(!productpriceExists) {
            throw new Error('productprice not found');
        }

        await productpriceRepository.update(productpriceExists.id,{
            price: price ? price : productpriceExists.price
        });

        const productLogRepository = getRepository(ProductLog);

        const productpriceLog = productLogRepository.create({
            user_id: user_id,
            product_id: productpriceExists.product_id,
            code: `UPDATE`,
            message: `{service:'update',price: {from:'${price}',to:'${productpriceExists.price}'}}`
        });

        await productLogRepository.save(productpriceLog);

        const productprice = await productpriceRepository.findOne(id);

        return productprice ? productprice : productpriceExists;
    }
}

export default UpdateProductPriceService;