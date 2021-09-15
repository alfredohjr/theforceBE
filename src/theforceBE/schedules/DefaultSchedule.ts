
export default {
    key: 'defaultSchedule',
    cron: '1/1 * * * *',
    async handle(): Promise<void> {
        console.log(new Date(),'defaultSchedule','is running');
    }
};