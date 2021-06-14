import { getRepository } from 'typeorm';
import ProductDetail from '../models/ProductDetail';

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
            throw new Error('productdetail not found');
        }

        if(productdetailExists.deleted_at !== null) {
            throw new Error('productdetail deleted');
        }

    }
}

export default IsValidProductDetailService;
