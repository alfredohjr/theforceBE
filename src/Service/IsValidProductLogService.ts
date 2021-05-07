import { getRepository } from 'typeorm';
import ProductLog from '../models/ProductLog';

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
            throw new Error('productlog not found');
        }

    }
}

export default IsValidProductLogService;
