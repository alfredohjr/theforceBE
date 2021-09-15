import { getRepository } from 'typeorm';
import UserPermission from '../../Models/UserPermission';
import PermissionLog from '../../Models/PermissionLog';

import AppError from '../../../theforceBE/errors/AppError';

interface Request {
    id: string;
    user_id: string;
};

class DeleteUserPermissionService {
    public async execute({id, user_id}: Request): Promise<void> {

        const userpermissionRepository = getRepository(UserPermission);
        const permissionLogRepository = getRepository(PermissionLog);

        const userpermissionExists = await userpermissionRepository.findOne({
            where: {
                id,
                deleted_at: null
            }
        });

        if(!userpermissionExists) {
            throw new AppError('userpermission not found');
        }

        await userpermissionRepository.update(userpermissionExists.id,{
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

export default DeleteUserPermissionService;