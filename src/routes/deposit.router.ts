import { request, response, Router } from 'express';

import AuthUser from '../middlewares/AuthUser.middlewares'; 
import CreateDepositService from '../Service/CreateDepositService';
import UpdateDepositService from '../Service/UpdateDepositService';
import DeleteDepositService from '../Service/DeleteDepositService';
import RegisterDeposit from '../middlewares/RegisterDeposit.middlewares';
import IsValidDeposit from '../middlewares/IsValidDeposit.middlewares';

const depositRouter = Router();

depositRouter.use(AuthUser);

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

depositRouter.use(IsValidDeposit);
depositRouter.use(RegisterDeposit);

depositRouter.put('/', async (request, response) => {
    try {
        
        const { id, name } = request.body;
        const user_id = request.user.id;

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

        const deleteDeposit = new DeleteDepositService();
        await deleteDeposit.execute({ id, user_id });

        return response.status(200).json({message: 'success'});
    } catch (err) {
        return response.status(400).json({error: err.message})
    }
});


export default depositRouter;