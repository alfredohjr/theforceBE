import { getRepository } from "typeorm";
import Stock from "../models/Stock";

interface Request {
    deposit_id: string;
    product_id: string;
    type: 'in' | 'out';
    value: number;
}

class RegisterStockService {
    public async execute({deposit_id, product_id, value, type}: Request): Promise<Stock | void> {
        const stockRepository = getRepository(Stock);

        const stockExists = await stockRepository.findOne({
            where: {
                deposit_id,
                product_id
            }
        });

        var newValue = 0;
        if(type === 'out') {
            newValue = value * -1;
        } else if(type === 'in') {
            newValue = value * 1;
        } else {
            throw new Error('please, send in or out in type of movement');
        }

        if(stockExists) {
            await stockRepository.update(stockExists.id, {
                value: stockExists.value + newValue
            });

            const stock = await stockRepository.findOne({
                where: {
                    deposit_id,
                    product_id
                }
            });

            return stock;
        } else {
            const stock = stockRepository.create({
                deposit_id,
                product_id,
                value
            });

            await stockRepository.save(stock);

            return stock;
        }
    }
}

export default RegisterStockService;