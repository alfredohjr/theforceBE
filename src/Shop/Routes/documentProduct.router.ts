import { request, Router } from 'express';
import CreateDocumentProductService from '../Services/DocumentProduct/CreateDocumentProductService';
import GetDocumentProductService from '../Services/DocumentProduct/GetDocumentProductService';
import IsValidDocumentService from '../Services/Document/IsValidDocumentService';
import IsValidProductService from '../Services/Product/IsValidProductService';

const documentProductRouter = Router();

documentProductRouter.get('/:document_id', async(request, response, next) => {
    try {
        const { document_id } = request.params;

        const documentProduct = new GetDocumentProductService();
        const documentProducts = await documentProduct.execute(document_id);

        return response.status(200).json(documentProducts);
    } catch (err) {
        next(err);
    }
});

documentProductRouter.post('/', async(request, response, next) => {
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
        next(err);
    }
});

documentProductRouter.put('/', async(request, response, next) => {
    try {
        return response.status(500).json({ message: `${request.method} is empty`});
    } catch (err) {
        next(err);
    }
});

documentProductRouter.delete('/', async(request, response, next) => {
    try {
        return response.status(500).json({ message: `${request.method} is empty`});
    } catch (err) {
        next(err);
    }
});

export default documentProductRouter;