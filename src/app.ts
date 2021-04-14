import express from 'express';

const app = express();
app.use(express.json());

app.get('/', (request, response) => {
    try {
        return response.status(200).json({message:"Ola"});
    } catch (err) {
        return response.status(400).json({message:err.message});
    }
})

export default app;