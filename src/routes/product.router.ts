import { request, response, Router } from 'express';

import CreateProductService from '../Service/CreateProductService';
import DeleteProductService from '../Service/DeleteProductService';
import GetProductService from '../Service/GetProductService';
import IsValidProductService from '../Service/IsValidProductService';
import UpdateProductService from '../Service/UpdateProductService';
import priceRouter from './productPrice.router';

const productRouter = Router();

productRouter.use('/price',priceRouter);

productRouter.get('/', async (request, response) => {
    try {
        const {id} = request.body;
        const getProducts = new GetProductService();

        const products = await getProducts.execute({id});

        return response.status(200).json(products);
    } catch (err) {
        return response.status(400).json({error: err.message});
    }
});

productRouter.post('/', async (request, response) => {
    try {
        const { name } = request.body;
        const user_id = request.user.id;
        
        const productService = new CreateProductService();
        
        const product = await productService.execute({name, user_id});

        return response.status(200).json(product);

    } catch (err) {
        return response.status(400).json({error: err.message});
    }
});

productRouter.put('/', async (request, response) => {
    try {
        const { id, name } = request.body;
        const user_id = request.user.id;

        const isValidProduct = new IsValidProductService();
        await isValidProduct.execute({id});

        const productRepository = new UpdateProductService();

        const product = await productRepository.execute({
            id: id,
            name: name,
            user_id: user_id
        });

        return response.status(200).json(product);

    } catch (err) {
        return response.status(400).json({error: err.message});
    }
});

productRouter.delete('/', async (request, response) => {
    try {
        const { id } = request.body;
        const user_id = request.user.id;

        const isValidProduct = new IsValidProductService();
        await isValidProduct.execute({id});

        const productService = new DeleteProductService();

        await productService.execute({id, user_id});

        return response.status(200).json({message: `product ${id} deleted`})

    } catch (err) {
        return response.status(400).json({error: err.message})
    }
});


export default productRouter;