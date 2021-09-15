import { request, response, Router } from 'express';

import GetStockService from '../Services/Stock/GetStockService';
import stockmovementRouter from './stockmovement.router';

const stockRouter = Router();

stockRouter.use('/movement', stockmovementRouter);

stockRouter.get('/', async (request, response, next) => {
    try {

        const { product_id } = request.body;

        const getStock = new GetStockService();
        const stock = await getStock.execute(product_id);

        response.status(200).json(stock);
    } catch (err) {
        response.status(400).json({message:err.message})
    }
});


export default stockRouter;
