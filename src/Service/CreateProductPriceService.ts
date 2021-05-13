import { getRepository } from 'typeorm';
import { isBefore, isAfter } from 'date-fns';
import ProductPrice from '../models/ProductPrice';

interface Request{
    user_id: string;
    product_id: string;
    level: string;
    started_at: Date;
    finished_at: Date;
    isoffer: boolean;
    price: number;
};

class CreateProductPriceService {
    public async execute({
            user_id, 
            product_id, 
            level, 
            started_at, 
            finished_at, 
            isoffer,
            price
        }:Request): Promise<ProductPrice>{
        const productpriceRepository = getRepository(ProductPrice);

        if(!isAfter(finished_at,started_at)){
            throw new Error('start is after finished');
        }

        if(isBefore(new Date(),started_at)) {
            throw new Error('start is before now');
        }

        
        const productprice = productpriceRepository.create({
            user_id, 
            product_id, 
            level, 
            started_at, 
            finished_at, 
            isoffer,
            price
        });

        await productpriceRepository.save(productprice);

        return productprice;
    }
}
export default CreateProductPriceService;
