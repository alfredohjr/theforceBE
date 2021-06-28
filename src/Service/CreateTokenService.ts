import { getRepository } from 'typeorm';
import Token from '../models/Token';

import AppError from '../errors/AppError';

interface Request{
    hash: string;
    user_id: string;
};

class CreateTokenService {
    public async execute({hash, user_id}:Request): Promise<Token>{
        const tokenRepository = getRepository(Token);

        const tokenExists = await tokenRepository.find({
             where:{
                 user_id,
                 isvalid: true
             }
        });

        if(tokenExists) {
            throw new AppError('token for user already exists');
        };

        const token = tokenRepository.create({
            hash,
            user_id,
            isvalid: true
        });

        await tokenRepository.save(token);

        return token;
    }
}
export default CreateTokenService;
