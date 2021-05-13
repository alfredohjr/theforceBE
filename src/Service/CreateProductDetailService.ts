import { getRepository } from 'typeorm';
import ProductDetail from '../models/ProductDetail';

interface Request{
    user_id: string;
    product_id: string;
    text: string;
};

class CreateProductDetailService {
    public async execute({user_id, product_id, text}:Request): Promise<ProductDetail>{
        const productdetailRepository = getRepository(ProductDetail);

        const productdetailExists = await productdetailRepository.find({
             where:{
                 product_id,
                 deleted_at: null
             }
        });

        if(productdetailExists) {
            throw new Error('product detail already exists');
        };

        const productdetail = productdetailRepository.create({
            user_id,
            product_id,
            text
        });

        await productdetailRepository.save(productdetail);

        return productdetail;
    }
}
export default CreateProductDetailService;
