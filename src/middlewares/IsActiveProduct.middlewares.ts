import express from 'express';

import IsValidProductService from '../Service/IsValidProductService';

async function IsValidProduct(request: express.Request, response: express.Response, next: express.NextFunction) {

    try {

        const { id } = request.body;

        const isValidProduct = new IsValidProductService();

        await isValidProduct.execute({ id });

    } catch (err) {
        return response.status(400).json( { error: err.message } );
    }
    
    next();
}

export default IsValidProduct;