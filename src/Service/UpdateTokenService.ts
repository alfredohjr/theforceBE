import { getRepository } from 'typeorm';
import Token from '../models/Token';

interface Request {
    id: string;
}

class UpdateTokenService {
    public async execute({id}: Request): Promise<Token> {
        throw new Error('is not possible to update token');
    }
}

export default UpdateTokenService;