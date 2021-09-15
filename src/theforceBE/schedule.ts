import 'dotenv/config';

import Schedule from './lib/Schedule';

import createConnection from './database';
createConnection();

console.log('Schedule is started!')
const s = new Schedule();
s.process();