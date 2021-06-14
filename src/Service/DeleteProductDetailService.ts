import { getRepository } from 'typeorm';
import ProductDetail from '../models/ProductDetail';
import ProductLog from '../models/ProductLog';

interface Request {
    id: string;
    user_id: string;
};

class DeleteProductDetailService {
    public async execute({id, user_id}: Request): Promise<void> {

        const productdetailRepository = getRepository(ProductDetail);
        const productLogRepository = getRepository(ProductLog);

        const productdetailExists = await productdetailRepository.findOne({
            where: {
                id,
                deleted_at: null
            }
        });

        if(!productdetailExists) {
            throw new Error('productdetail not found');
        }

        await productdetailRepository.update(productdetailExists.id,{
            deleted_at: new Date()
        });

        const productdetaillog = productLogRepository.create({
            user_id,
            product_id: productdetailExists.product_id,
            code: 'DELETE',
            message: `{table:'product_detail', delete:'${id}'}`
        });

        await productLogRepository.save(productdetaillog);

    }
}

export default DeleteProductDetailService;