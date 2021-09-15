import Queue from 'bull';

import redisConfig from '../config/redis';

import * as schedules from '../schedules';

class Schedule {

    async process() {

        Object.values(schedules).map(schedule => {
            const q = Queue(schedule.key, redisConfig); 
            q.add({foo:schedule.key},{ repeat: { cron: schedule.cron}});
            q.process(schedule.handle);
            console.log(schedule.key)
        })
    }
}

export default Schedule;