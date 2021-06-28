// TODO:empty

import { getRepository } from 'typeorm';
import UserPermission from '../models/UserPermission';
import UserPermissionLog from '../models/UserPermissionLog';

import AppError from '../errors/AppError';

interface Request {
    id: string;
    user_id: string;
};

class DeleteUserPermissionService {
    public async execute({id, user_id}: Request): Promise<void> {

        const userpermissionRepository = getRepository(UserPermission);
        const userpermissionLogRepository = getRepository(UserPermissionLog);

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

        const userpermissionlog = userpermissionLogRepository.create({
            user_id,
            userpermission_id: id,
            code: 'DELETE',
            message: `{delete:'${id}'}`
        });

        await userpermissionLogRepository.save(userpermissionlog);

    }
}

export default DeleteUserPermissionService;