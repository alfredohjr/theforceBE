import { getRepository } from 'typeorm';
import ProductPrice from '../../Models/ProductPrice';
import ProductLog from '../../Models/ProductLog';

import AppError from '../../../theforceBE/errors/AppError';

interface Request {
    id: string;
    user_id: string;
};

class DeleteProductPriceService {
    public async execute({id, user_id}: Request): Promise<void> {

        const productpriceRepository = getRepository(ProductPrice);
        const productLogRepository = getRepository(ProductLog);

        const productpriceExists = await productpriceRepository.findOne({
            where: {
                id,
                deleted_at: null
            }
        });

        if(!productpriceExists) {
            throw new AppError('productprice not found');
        }

        await productpriceRepository.update(productpriceExists.id,{
            deleted_at: new Date()
        });

        const productpricelog = productLogRepository.create({
            user_id,
            product_id: productpriceExists.product_id,
            code: 'DELETE',
            message: `{delete:'${id}',object:'price'}`
        });

        await productLogRepository.save(productpricelog);

    }
}

export default DeleteProductPriceService;