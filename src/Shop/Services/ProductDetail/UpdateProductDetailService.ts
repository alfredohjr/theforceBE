import { getRepository } from 'typeorm';
import ProductDetail from '../../Models/ProductDetail';
import CreateProductLogService from '../ProductLog/CreateProductLogService';

import AppError from '../../../theforceBE/errors/AppError';

interface Request {
    id: string;
    user_id: string;
    text: string;
}

class UpdateProductDetailService {
    public async execute({id, user_id, text}: Request): Promise<ProductDetail> {
        const productdetailRepository = getRepository(ProductDetail);

        const productdetailExists = await productdetailRepository.findOne(id);

        if(!productdetailExists) {
            throw new AppError('productdetail not found');
        }

        if(!(text)) {
            throw new AppError('please, send name for update');
        }

        await productdetailRepository.update(productdetailExists.id,{
            text: text ? text : productdetailExists.text
        });

        const productLog = new CreateProductLogService();
        await productLog.execute({
            user_id: user_id,
            product_id: id,
            code: `UPDATE`,
            message: `{service:'update',name: {from:'${text}',to:'${productdetailExists.text}'}}`
        });

        const productdetail = await productdetailRepository.findOne(id);

        return productdetail ? productdetail : productdetailExists;
    }
}

export default UpdateProductDetailService;