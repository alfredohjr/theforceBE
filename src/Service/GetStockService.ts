import { getRepository } from 'typeorm';
import Stock from '../models/Stock';

class GetStockService {
    public async execute(product_id: string): Promise<Stock[]> {
        const stockRepository = getRepository(Stock);

        if(product_id) {
            const stocks = await stockRepository.find({
                where: {
                    deleted_at: null,
                    product_id
                }
            });
    
            return stocks;
        }

        const stocks = await stockRepository.find({
            where: {
                deleted_at: null
            }
        });

        return stocks;
    }
}

export default GetStockService;
