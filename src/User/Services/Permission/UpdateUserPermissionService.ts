import { getRepository } from 'typeorm';
import UserPermission from '../../Models/UserPermission';
import CreateUserLogService from '../UserLog/CreateUserLogService';

import AppError from '../../../theforceBE/errors/AppError';

interface Request {
    id: string;
    user_id: string;
    permission_id: string;
}

class UpdateUserPermissionService {
    public async execute({id, user_id, permission_id}: Request): Promise<UserPermission> {
        const userpermissionRepository = getRepository(UserPermission);

        const userpermissionExists = await userpermissionRepository.findOne(id);

        if(!userpermissionExists) {
            throw new AppError('userpermission not found');
        }

        if(!(permission_id)) {
            throw new AppError('please, send permission for update');
        }

        await userpermissionRepository.update(userpermissionExists.id,{
            permission_id: permission_id ? permission_id : userpermissionExists.permission_id
        });

        const userLog = new CreateUserLogService();
        await userLog.execute({
            user_id: user_id,
            code: `UPDATE`,
            message: `{service:'update',permission_id: {from:'${permission_id}',to:'${userpermissionExists.permission_id}'}}`
        });

        const userpermission = await userpermissionRepository.findOne(id);

        return userpermission ? userpermission : userpermissionExists;
    }
}

export default UpdateUserPermissionService;