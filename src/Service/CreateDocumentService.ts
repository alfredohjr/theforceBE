import { request } from "express";
import { getRepository } from "typeorm";
import Document from "../models/Document";

import AppError from '../errors/AppError';

interface Request {
    key: string,
    entity_id: string;
    deposit_id: string;
    user_id: string;
    type: 'in' | 'out';
}

class CreateDocumentService {
    public async execute({key, entity_id, deposit_id, user_id, type}: Request): Promise<Document> {
        const documentRepository = getRepository(Document);

        const documentExists = await documentRepository.findOne({
            where: {
                key,
                entity_id,
                deposit_id
            }
        });

        if(documentExists) {
            throw new AppError('document already exists');
        }

        if(!['in','out'].includes(type)) {
            throw new AppError('please, send in or out in type of document');
        }

        const document = documentRepository.create({
            key,
            user_id,
            entity_id,
            deposit_id,
            type
        });

        await documentRepository.save(document);

        return document;

    }
}

export default CreateDocumentService;