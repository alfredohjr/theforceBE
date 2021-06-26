import path from "path";
import fs from 'fs';

import { getRepository } from "typeorm";

import uploadConfig from '../config/upload';
import User from "../models/User";
import IsValidUserService from "./IsValidUserService";


interface Request {
    user_id: string;
    avatar?: string;
}

class UpdateUserAvatarService {
    public async execute({user_id,avatar}: Request) {
        const UserRepository = getRepository(User);
        const isValidUser = new IsValidUserService();

        await isValidUser.execute({id: user_id});

        const user = await UserRepository.findOne(user_id);

        if(user?.avatar) {
            const userAvatarFile = path.join(uploadConfig.directory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFile);

            if(userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFile);
            }
        }

        await UserRepository.update(user_id,{
            avatar
        });
    }
}

export default UpdateUserAvatarService;