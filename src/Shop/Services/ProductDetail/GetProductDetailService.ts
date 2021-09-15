import { getRepository } from 'typeorm';
import ProductDetail from '../../Models/ProductDetail';

class GetProductDetailService {
    public async execute(product_id: string): Promise<ProductDetail[]> {
        const productdetailRepository = getRepository(ProductDetail);

        const productdetails = await productdetailRepository.find({
            where: {
                deleted_at: null,
                product_id
            }
        });

        return productdetails;
    }
}

export default GetProductDetailService;
