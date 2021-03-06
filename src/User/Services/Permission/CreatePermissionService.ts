import { getRepository } from 'typeorm';
import Permission from '../../Models/Permission';

import AppError from '../../../theforceBE/errors/AppError';

interface Request{
    name: string;
    method: string;
    url: string;
    user_id: string;
};

class CreatePermissionService {
    public async execute({name, method, url}:Request): Promise<Permission>{
        const permissionRepository = getRepository(Permission);

        const permissionExists = await permissionRepository.find({
             where:{
                 method,
                 url,
                 deleted_at: null
             }
        });

        if(permissionExists) {
            throw new AppError('permission already exists');
        };

        const permission = permissionRepository.create({
            name,
            method,
            url
        });

        await permissionRepository.save(permission);

        return permission;
    }
}
export default CreatePermissionService;
