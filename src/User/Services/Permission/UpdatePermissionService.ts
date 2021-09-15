import AppError from '../../../theforceBE/errors/AppError';

class UpdatePermissionService {
    public async execute(): Promise<void> {
        throw new AppError('is not possible to update permission, please create a new permission');
    }
}

export default UpdatePermissionService;