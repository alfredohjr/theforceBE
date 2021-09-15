import { Router } from "express";
import CreateProductPriceService from "../Services/ProductPrice/CreateProductPriceService";
import DeleteProductPriceService from "../Services/ProductPrice/DeleteProductPriceService";
import GetProductPriceService from "../Services/ProductPrice/GetProductPriceService";



const priceRouter = Router();

priceRouter.get('/', async (request, response, next) => {
    try {
        const {id} = request.body;
        const getPrices = new GetProductPriceService();

        const prices = await getPrices.execute({id});

        return response.status(200).json(prices);
    } catch (err) {
        next(err);
    }
});

priceRouter.post('/', async (request, response, next) => {
    try {
        const {
            product_id,            
            level,
            started_at,
            finished_at,
            isoffer,
            price} = request.body;
        const user_id = request.user.id;
        const createPrice = new CreateProductPriceService();

        const prices = await createPrice.execute({
            user_id,
            product_id,
            level,
            started_at,
            finished_at,
            isoffer,
            price
        });

        return response.status(200).json(prices);
    } catch (err) {
        next(err);
    }
});

priceRouter.delete('/', async(request, response) => {
    try {
        const { id } = request.body;
        const user_id = request.user.id;

        const deletePrice = new DeleteProductPriceService();
        await deletePrice.execute({id,user_id});

        return response.status(200).json({message: `price id ${id} is deleted`});
    } catch (err) {
        return response.status(400).json({error: err.message});
    }
})

export default priceRouter;