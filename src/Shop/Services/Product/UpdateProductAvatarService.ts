import path from "path";
import fs from 'fs';

import { getRepository } from "typeorm";

import uploadConfig from '../../../theforceBE/config/upload';
import Product from "../../Models/Product";
import IsValidProductService from "./IsValidProductService";

interface Request {
    user_id: string;
    id: string;
    avatar?: string;
}

class UpdateProductAvatarService {
    public async execute({user_id, avatar, id}: Request) {
        const ProductRepository = getRepository(Product);
        const isValidProduct = new IsValidProductService();

        await isValidProduct.execute({id});

        const product = await ProductRepository.findOne(id);

        if(product?.avatar) {
            const productAvatarFile = path.join(uploadConfig.directory, product.avatar);
            const productAvatarFileExists = await fs.promises.stat(productAvatarFile);

            if(productAvatarFileExists) {
                await fs.promises.unlink(productAvatarFile);
            }
        }

        await ProductRepository.update(id,{
            avatar
        });
    }
}

export default UpdateProductAvatarService;