// TODO: falta arrumar os preços por level e isoffer... 

import { getConnection, getRepository, LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import Product from "../models/Product";
import ProductPrice from "../models/ProductPrice";

interface Request {
    id?: string;
}

class GetProductPriceService {
    public async execute({id}: Request): Promise<ProductPrice[] | ProductPrice> {
        const priceRepository = getRepository(ProductPrice);

        if(id) {
            const price = await priceRepository.findOne({
                where: {
                    product_id: id,
                    started_at: LessThanOrEqual(new Date()),
                    finished_at: MoreThanOrEqual(new Date()),
                    deleted_at: null
                },
                order: {
                    created_at: 'DESC'
                }
            });

            if(!price) {
                throw new Error('product not found');
            }
            
            return price;
        }

        const maxPrices = getRepository(ProductPrice)
            .createQueryBuilder('maxprices')
            .select('maxprices.product_id')
            .addSelect('maxprices.level')
            .addSelect('maxprices.isoffer')
            .addSelect('max(maxprices.created_at)','created_at')
            .where('maxprices.deleted_at is null')
            .andWhere('maxprices.started_at <= :startedat',{ startedat: new Date()})
            .andWhere('maxprices.finished_at >= :finishedat',{ finishedat: new Date()})
            .groupBy('maxprices.product_id')
            .addGroupBy('maxprices.level')
            .addGroupBy('maxprices.isoffer');
        
        const products = getRepository(Product)
            .createQueryBuilder('products')
            .select('products.id')
            .where('deleted_at is null')

        const prices = await getConnection()
            .createQueryBuilder()
            .select('prices')
            .from(ProductPrice,'prices')
            .where('(prices.product_id, prices.level, prices.isoffer, prices.created_at) in (' + maxPrices.getQuery() + ')')
            .andWhere('prices.product_id in (' + products.getQuery() + ')')
            .setParameters(maxPrices.getParameters())
            .getMany();

        return prices
    }
}

export default GetProductPriceService;