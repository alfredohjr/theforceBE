import express from 'express';
import { getRepository } from 'typeorm';
import Permission from '../Models/Permission';
import User from '../Models/User';
import UserPermission from '../Models/UserPermission';

import AppError from '../../theforceBE/errors/AppError';

async function PermissionUser(request: express.Request, response: express.Response, next: express.NextFunction) {

    mytry: try {
        
        const { method, url } = request;
        const user_id = request.user.id;

        const userRepository = getRepository(User);
        const userIsMaster = await userRepository.findOne({
            where: {
                id: user_id,
                ismaster: true
            }
        });

        if(userIsMaster){
            break mytry;
        }

        const permissionRepository = getRepository(Permission);
        const permissionExists = await permissionRepository.findOne({
            method: request.method,
            url: request.url
        });

        if(!permissionExists) {
            throw new AppError('permission not found');
        };

        const userPermissionRepository = getRepository(UserPermission);
        const userPermissionExists = await userPermissionRepository.findOne({
            where: {
                user_id,
                permission_id: permissionExists.id,
                deleted_at: null
            }
        });

        if(!userPermissionExists) {
            throw new AppError('operation not allowed for this user');
        }

        if(userPermissionExists.active === false) {
            throw new AppError('operation not active for this user');
        }

        if(userPermissionExists.enabled === false) {
            throw new AppError('operation not enable for this user');
        }

    } catch (err) {
        return response.status(401).json( { error: err.message } );
    }
    
    next();
}

export default PermissionUser;