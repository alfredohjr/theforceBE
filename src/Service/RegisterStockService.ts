import { getRepository } from "typeorm";
import Stock from "../models/Stock";

import AppError from '../errors/AppError';

interface Request {
    user_id: string;
    deposit_id: string;
    product_id: string;
    type: 'in' | 'out';
    value: number;
    amount: number;
}

class RegisterStockService {
    public async execute({user_id, deposit_id, product_id, value, type, amount}: Request): Promise<Stock | void> {
        const stockRepository = getRepository(Stock);

        if(value < 0) {
            throw new AppError('negative value not allowed');
        }

        const stockExists = await stockRepository.findOne({
            where: {
                deposit_id,
                product_id
            }
        });

        var newAmount = 0;
        if(type === 'out') {
            newAmount = amount * -1;
        } else if(type === 'in') {
            newAmount = amount * 1;
        } else {
            throw new AppError('please, send in or out in type of movement');
        }

        if(stockExists) {
            await stockRepository.update(stockExists.id, {
                amount: stockExists.amount + newAmount
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
                user_id,
                value,
                amount: newAmount
            });

            await stockRepository.save(stock);

            return stock;
        }
    }
}

export default RegisterStockService;