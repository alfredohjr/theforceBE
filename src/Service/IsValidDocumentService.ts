import { getRepository } from "typeorm";
import Document from "../models/Document";

interface Request {
    id: string;
}

class IsValidDocumentService {
    public async execute({id}:Request): Promise<void> {
        const documentRepository = getRepository(Document);

        const documentExists = await documentRepository.findOne({
            where: {
                id
            }
        });

        if(!documentExists) {
            throw new Error('document not found');
        }

        if(documentExists.closed_at !== null) {
            throw new Error('document is closed');
        }

        if(documentExists.deleted_at !== null) {
            throw new Error('document deleted');
        }
    }
}

export default IsValidDocumentService;