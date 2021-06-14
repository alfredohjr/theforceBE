import { getRepository } from 'typeorm';
import UserPermission from '../models/UserPermission';

class GetUserPermissionService {
    public async execute(user_id: string): Promise<UserPermission[]> {
        const userpermissionRepository = getRepository(UserPermission);

        const userpermissions = await userpermissionRepository.find({
            where: {
                deleted_at: null,
                user_id
            }
        });

        return userpermissions;
    }
}

export default GetUserPermissionService;
