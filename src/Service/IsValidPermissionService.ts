import { getRepository } from 'typeorm';
import Permission from '../models/Permission';

import AppError from '../errors/AppError';

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
