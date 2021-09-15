import { getRepository } from 'typeorm';
import Token from '../../Models/Token';

import AppError from '../../../theforceBE/errors/AppError';

interface Request {
    id: string;
}

class UpdateTokenService {
    public async execute({id}: Request): Promise<Token> {
        throw new AppError('is not possible to update token');
    }
}

export default UpdateTokenService;