import { getRepository } from 'typeorm';
import UserPermission from '../models/UserPermission';

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
            throw new Error('userpermission not found');
        }

        if(userpermissionExists.deleted_at !== null) {
            throw new Error('userpermission deleted');
        }

    }
}

export default IsValidUserPermissionService;
