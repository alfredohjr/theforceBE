import { getRepository } from 'typeorm';
import Token from '../models/Token';

import AppError from '../errors/AppError';

interface Request {
    id: string;
};

class IsValidTokenService {
    public async execute({id}:Request): Promise<void> {
        const tokenRepository = getRepository(Token);

        const tokenExists = await tokenRepository.findOne({
            where: {
                id,
                isvalid: true
            }
        });

        if(!tokenExists) {
            throw new AppError('token not found');
        }

    }
}

export default IsValidTokenService;
