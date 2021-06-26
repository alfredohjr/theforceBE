import { getRepository } from "typeorm";
import Token from "../models/Token";
import jwt from 'jsonwebtoken';


class DeleteOldTokensService {
    public async execute(): Promise<void> {
        const tokenRepository = getRepository(Token);
        
        const tokens = await tokenRepository.find({
            where: {
                isvalid: false
            }
        });
        
        tokens.forEach(t => {
            try {
                const isValidToken = jwt.verify(t.hash,process.env.SECRET);
            } catch (err) {
                if(err.message === 'jwt expired'){
                    tokenRepository.delete(t.id);
                }            
            }
        })
        
    }
}

export default DeleteOldTokensService;