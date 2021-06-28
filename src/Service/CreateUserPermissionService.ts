import { getRepository } from 'typeorm';
import UserPermission from '../models/UserPermission';

import AppError from '../errors/AppError';

interface Request{
    user_id: string;
    permission_id: string;
};

class CreateUserPermissionService {
    public async execute({user_id, permission_id}:Request): Promise<UserPermission>{
        const userpermissionRepository = getRepository(UserPermission);

        const userpermissionExists = await userpermissionRepository.find({
             where:{
                 user_id,
                 permission_id,
                 deleted_at: null
             }
        });

        if(userpermissionExists) {
            throw new AppError('user permission already exists');
        };

        const userpermission = userpermissionRepository.create({
            user_id,
            permission_id
        });

        await userpermissionRepository.save(userpermission);

        return userpermission;
    }
}

export default CreateUserPermissionService;
