// TODO:empty

import { getRepository } from 'typeorm';
import Permission from '../models/Permission';
import PermissionLog from '../models/PermissionLog';

interface Request {
    id: string;
    user_id: string;
};

class DeletePermissionService {
    public async execute({id, user_id}: Request): Promise<void> {

        const permissionRepository = getRepository(Permission);
        const permissionLogRepository = getRepository(PermissionLog);

        const permissionExists = await permissionRepository.findOne({
            where: {
                id,
                deleted_at: null
            }
        });

        if(!permissionExists) {
            throw new Error('permission not found');
        }

        await permissionRepository.update(permissionExists.id,{
            deleted_at: new Date()
        });

        const permissionlog = permissionLogRepository.create({
            user_id,
            permission_id: id,
            code: 'DELETE',
            message: `{delete:'${id}'}`
        });

        await permissionLogRepository.save(permissionlog);

    }
}

export default DeletePermissionService;