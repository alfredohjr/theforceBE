import { getRepository } from 'typeorm';
import Token from '../models/Token';

class GetTokenService {
    public async execute(): Promise<Token[]> {
        const tokenRepository = getRepository(Token);

        const tokens = await tokenRepository.find({
            where: {
                deleted_at: null
            }
        });

        return tokens;
    }
}

export default GetTokenService;
