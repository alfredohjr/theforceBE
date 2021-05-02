import { Router } from 'express';
import AuthUser from '../middlewares/AuthUser.middlewares';
import CloseDocumentService from '../Service/CloseDocumentService';
import CreateDocumentService from '../Service/CreateDocumentService';
import IsValidDepositService from '../Service/IsValidDepositService';
import documentProductRouter from './documentProduct.router';

const documentRouter = Router();

documentRouter.use(AuthUser);
documentRouter.use('/product',documentProductRouter);

documentRouter.post('/', async(request, response) => {
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
        response.status(400).json({ error: err.message})
    }
});

documentRouter.put('/', async(request, response) => {
    try {
        return response.status(500).json({ message: `${request.method} is empty`});
    } catch (err) {
        response.status(400).json({ error: err.message})
    }
});

documentRouter.delete('/', async(request, response) => {
    try {
        return response.status(500).json({ message: `${request.method} is empty`});
    } catch (err) {
        response.status(400).json({ error: err.message})
    }
});

documentRouter.post('/close', async(request, response) => {
    try {
        const { id } = request.body;
        const user_id = request.user.id;

        const closeDocument = new CloseDocumentService();
        await closeDocument.execute({id, user_id});

        return response.status(200).json({ message: `success`});
    } catch (err) {
        response.status(400).json({ error: err.message})
    }
});

export default documentRouter;