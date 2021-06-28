import { request, response, Router } from 'express';

import GetStockMovementService from '../Service/GetStockMovementService';

const stockmovementRouter = Router();

stockmovementRouter.get('/', async (request, response, next) => {
    try {

        const { deposit_id, product_id } = request.body;

        const getStockMovement = new GetStockMovementService();
        const stockMovement = await getStockMovement.execute({ deposit_id, product_id });

        response.status(200).json(stockMovement);
    } catch (err) {
        response.status(400).json({error:err.message});
    }
});


export default stockmovementRouter;
