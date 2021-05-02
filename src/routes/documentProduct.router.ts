import { request, Router } from 'express';
import CreateDocumentProductService from '../Service/CreateDocumentProductService';
import IsValidDocumentService from '../Service/IsValidDocumentService';
import IsValidProductService from '../Service/IsValidProductService';

const documentProductRouter = Router();

documentProductRouter.post('/', async(request, response) => {
    try {

        const { document_id, product_id, value, amount } = request.body;
        const user_id = request.user.id;

        const isValidDocument = new IsValidDocumentService();
        await isValidDocument.execute({id: document_id});

        const isValidProduct = new IsValidProductService();
        await isValidProduct.execute({id: product_id});

        const createDocumentProduct = new CreateDocumentProductService();
        const documentProduct = await createDocumentProduct.execute({
            user_id,
            document_id,
            product_id,
            value,
            amount
        });

        return response.status(500).json(documentProduct);
    } catch (err) {
        return response.status(400).json({ error: err.message});
    }
});

documentProductRouter.put('/', async(request, response) => {
    try {
        return response.status(500).json({ message: `${request.method} is empty`});
    } catch (err) {
        return response.status(400).json({ error: err.message});
    }
});

documentProductRouter.delete('/', async(request, response) => {
    try {
        return response.status(500).json({ message: `${request.method} is empty`});
    } catch (err) {
        return response.status(400).json({ error: err.message});
    }
});

export default documentProductRouter;