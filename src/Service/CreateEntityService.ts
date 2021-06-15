import { getRepository } from "typeorm";
import EntityModel from "../models/Entity";
import SendEmailService from "./SendEmailService";

interface Request {
    name: string;
    type: 'client' | 'provider';
    user_id: string;
}

class CreateEntityService {
    public async execute({name, type, user_id}:Request): Promise<EntityModel> {
        const entityRepository = getRepository(EntityModel);
        const sendEmail = new SendEmailService();

        if(name.length < 10) {
            throw new Error('minumum size of name is 10');
        }

        const entityExists = await entityRepository.findOne({
            where: {
                name
            }
        });

        if(entityExists) {
            throw new Error('please, send new name for this entity');
        }

        if(!['client','provider'].includes(type)) {
            throw new Error('please, send client or provider for type of entity');
        }

        const entity = entityRepository.create({
            name,
            type,
            user_id
        });

        await entityRepository.save(entity);

        await sendEmail.execute({
            to:'alfredo@test2.com.br'
            , subject:'Oi'
            , template: 'newEntity'
            , context: {
                name
            }
        });

        return entity;
    }
}

export default CreateEntityService;