import app from './app';

import dotenv from 'dotenv';

dotenv.config();

console.log(`APP NAME: ${process.env.APP_NAME}`)

app.listen(3333, () => {
    console.log('NumeroUm');
});