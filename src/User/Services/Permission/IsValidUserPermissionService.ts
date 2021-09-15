import { getRepository } from 'typeorm';
import UserPermission from '../../Models/UserPermission';

import AppError from '../../../theforceBE/errors/AppError';

interface Request {
    id: string;
};

class IsValidUserPermissionService {
    public async execute({id}:Request): Promise<void> {
        const userpermissionRepository = getRepository(UserPermission);

        const userpermissionExists = await userpermissionRepository.findOne({
            where: {
                id
            }
        });

        if(!userpermissionExists) {
            throw new AppError('userpermission not found');
        }

        if(userpermissionExists.deleted_at !== null) {
            throw new AppError('userpermission deleted');
        }

    }
}

export default IsValidUserPermissionService;
