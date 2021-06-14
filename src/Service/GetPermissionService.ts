import { getRepository } from 'typeorm';
import Permission from '../models/Permission';

class GetPermissionService {
    public async execute(): Promise<Permission[]> {
        const permissionRepository = getRepository(Permission);

        const permissions = await permissionRepository.find({
            where: {
                deleted_at: null
            }
        });

        return permissions;
    }
}

export default GetPermissionService;
