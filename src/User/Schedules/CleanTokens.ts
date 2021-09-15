import DeleteOldTokensService from '../Services/Token/DeleteOldTokensService';

export default {
    key: 'CleanToken',
    cron: '1/1 * * * *',
    async handle(): Promise<void> {
        console.log(new Date(),'CleanToken is started');

        const deleteOldTokenService = new DeleteOldTokensService();
        await deleteOldTokenService.execute();

        console.log(new Date(),'CleanToken is finished');
    }
};