import { getRepository } from 'typeorm';
import Token from '../models/Token';

import AppError from '../errors/AppError';

interface Request {
    id: string;
}

class UpdateTokenService {
    public async execute({id}: Request): Promise<Token> {
        throw new AppError('is not possible to update token');
    }
}

export default UpdateTokenService;