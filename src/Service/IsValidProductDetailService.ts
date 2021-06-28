import { getRepository } from 'typeorm';
import ProductDetail from '../models/ProductDetail';

import AppError from '../errors/AppError';

interface Request {
    id: string;
};

class IsValidProductDetailService {
    public async execute({id}:Request): Promise<void> {
        const productdetailRepository = getRepository(ProductDetail);

        const productdetailExists = await productdetailRepository.findOne({
            where: {
                id
            }
        });

        if(!productdetailExists) {
            throw new AppError('productdetail not found');
        }

        if(productdetailExists.deleted_at !== null) {
            throw new AppError('productdetail deleted');
        }

    }
}

export default IsValidProductDetailService;
