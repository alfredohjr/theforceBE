import { request, response, Router } from 'express';

import CreateDepositService from '../Service/CreateDepositService';
import UpdateDepositService from '../Service/UpdateDepositService';
import DeleteDepositService from '../Service/DeleteDepositService';
import GetDepositService from '../Service/GetDepositService';
import IsValidDepositService from '../Service/IsValidDepositService';

const depositRouter = Router();

depositRouter.post('/', async (request, response) => {
    try {
        
        const { name } = request.body;
        const user_id = request.user.id;

        const createDeposit = new CreateDepositService();
        const deposit = await createDeposit.execute({ name, user_id });

        return response.status(200).json(deposit);
    } catch (err) {
        return response.status(400).json({error: err.message});
    }
});

depositRouter.get('/', async (request, response) => {
    try {
        
        const getDeposit = new GetDepositService();
        const deposits = await getDeposit.execute();

        return response.status(200).json(deposits);
    } catch (err) {
        return response.status(400).json({error: err.message});
    }
});

depositRouter.put('/', async (request, response) => {
    try {
        
        const { id, name } = request.body;
        const user_id = request.user.id;

        const isValidDeposit = new IsValidDepositService();
        await isValidDeposit.execute({id});

        const updateDeposit = new UpdateDepositService();
        const deposit = await updateDeposit.execute({ id, name, user_id });

        return response.status(200).json(deposit);
    } catch (err) {
        return response.status(400).json({error: err.message});
    }
});

depositRouter.delete('/', async (request, response) => {
    try {

        const { id } = request.body;
        const user_id = request.user.id;

        const isValidDeposit = new IsValidDepositService();
        await isValidDeposit.execute({id});

        const deleteDeposit = new DeleteDepositService();
        await deleteDeposit.execute({ id, user_id });

        return response.status(200).json({message: 'success'});
    } catch (err) {
        return response.status(400).json({error: err.message})
    }
});


export default depositRouter;