import { getRepository } from 'typeorm';
import ProductPrice from '../../Models/ProductPrice';
import CreateProductLogService from '../ProductLog/CreateProductLogService';

import AppError from '../../../theforceBE/errors/AppError';

interface Request {
    id: string;
    user_id: string;
    price: number;
}

class UpdateProductPriceService {
    public async execute({id, user_id, price}: Request): Promise<ProductPrice> {
        const productpriceRepository = getRepository(ProductPrice);

        if(price < 0) {
            throw new AppError('negative value not allowed');
        }

        const productpriceExists = await productpriceRepository.findOne(id);

        if(!productpriceExists) {
            throw new AppError('productprice not found');
        }

        await productpriceRepository.update(productpriceExists.id,{
            price: price ? price : productpriceExists.price
        });

        const productLog = new CreateProductLogService();
        await productLog.execute({
            user_id: user_id,
            product_id: productpriceExists.product_id,
            code: `UPDATE`,
            message: `{service:'update',price: {from:'${price}',to:'${productpriceExists.price}'}}`
        });

        const productprice = await productpriceRepository.findOne(id);

        return productprice ? productprice : productpriceExists;
    }
}

export default UpdateProductPriceService;