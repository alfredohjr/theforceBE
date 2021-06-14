import { getRepository } from 'typeorm';
import Permission from '../models/Permission';

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
            throw new Error('permission not found');
        }

        if(permissionExists.deleted_at !== null) {
            throw new Error('permission deleted');
        }

    }
}

export default IsValidPermissionService;
