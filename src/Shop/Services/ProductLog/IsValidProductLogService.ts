import { getRepository } from 'typeorm';
import ProductLog from '../../Models/ProductLog';

import AppError from '../../../theforceBE/errors/AppError';

interface Request {
    id: string;
};

class IsValidProductLogService {
    public async execute({id}:Request): Promise<void> {
        const productlogRepository = getRepository(ProductLog);

        const productlogExists = await productlogRepository.findOne({
            where: {
                id
            }
        });

        if(!productlogExists) {
            throw new AppError('productlog not found');
        }

    }
}

export default IsValidProductLogService;
