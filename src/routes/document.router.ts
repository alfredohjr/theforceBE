import { Router } from 'express';
import CloseDocumentService from '../Service/CloseDocumentService';
import CreateDocumentService from '../Service/CreateDocumentService';
import DeleteDocumentService from '../Service/DeleteDocumentService';
import GetDocumentService from '../Service/GetDocumentService';
import IsValidDepositService from '../Service/IsValidDepositService';
import ReOpenDocumentService from '../Service/ReOpenDocumentService';
import documentProductRouter from './documentProduct.router';

const documentRouter = Router();

documentRouter.use('/product',documentProductRouter);

documentRouter.get('/', async (request, response, next) => {
    try {
        
        const getDocument = new GetDocumentService();
        const documents = await getDocument.execute();

        return response.status(200).json(documents);
    } catch (err) {
        next(err);
    }
});

documentRouter.post('/', async(request, response, next) => {
    try {

        const { key, deposit_id, entity_id, type } = request.body;
        const user_id = request.user.id;

        const isValidDeposit = new IsValidDepositService();
        await isValidDeposit.execute({id: deposit_id});

        const createDocument = new CreateDocumentService();
        const document = await createDocument.execute({
            key,
            deposit_id,
            entity_id,
            user_id,
            type
        });

        return response.status(200).json(document);
    } catch (err) {
        next(err);
    }
});

documentRouter.put('/', async(request, response, next) => {
    try {
        return response.status(500).json({ message: `${request.method} is empty`});
    } catch (err) {
        next(err);
    }
});

documentRouter.delete('/', async(request, response, next) => {
    try {

        const { id } = request.body;
        const user_id = request.user.id;

        const document = new DeleteDocumentService();
        await document.execute({id,user_id});

        return response.status(200).json({ message: `document ${id} is deleted`});
    } catch (err) {
        next(err);
    }
});

documentRouter.post('/close', async(request, response, next) => {
    try {
        const { id } = request.body;
        const user_id = request.user.id;

        const closeDocument = new CloseDocumentService();
        await closeDocument.execute({id, user_id});

        return response.status(200).json({ message: `success`});
    } catch (err) {
        next(err);
    }
});

documentRouter.post('/open', async(request, response, next) => {
    try {
        const { id } = request.body;
        const user_id = request.user.id;

        const openDocument = new ReOpenDocumentService();
        await openDocument.execute({id, user_id});

        return response.status(200).json({ message: `success`});
    } catch (err) {
        next(err);
    }
});

export default documentRouter;