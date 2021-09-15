import { getRepository } from 'typeorm';
import Permission from '../../Models/Permission';

import AppError from '../../../theforceBE/errors/AppError';

interface Request {
    id: string;
};

class IsValidPermissionService {
    public async execute({id}:Request): Promise<void> {
        const permissionRepository = getRepository(Permission);

        const permissionExists = await permissionRepository.findOne({
            where: {
                id
            }
        });

        if(!permissionExists) {
            throw new AppError('permission not found');
        }

        if(permissionExists.deleted_at !== null) {
            throw new AppError('permission deleted');
        }

    }
}

export default IsValidPermissionService;
