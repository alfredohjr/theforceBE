import request from 'supertest';
import { Connection, createConnection, getConnection } from 'typeorm'; 

import app from '../app';

let connection: Connection;

describe('Stock', () => {

    beforeAll(async () => {
        connection = await createConnection();

        // await connection.query('DROP TABLE IF EXISTS TOKENS');
        // await connection.runMigrations();
    });

    afterAll(async () => {
        const mainConnection = getConnection(); 

        await connection.close();
        await mainConnection.close();
    });

    it('Create Stock', async () => {
        
        var response = await request(app).post('/stock')
        .send({
            name: 'numeroUm'
        });

        expect(response.body.error).toBe('please, send valid token');

        response = await request(app).post('/login')
        .send({
            email: 'alfredo@localhost.com.br',
            password: '123456'
        });

        const {token} = response.body;

        response = await request(app).post('/stock')
        .set({'Authorization': `Bearer ${token}`})
        .send({
            name: 'numeroUm'
        });

        expect(response.body.name).toBe('numeroUm');

        response = await request(app).post('/stock')
        .set({'Authorization': `Bearer ${token}`})
        .send({
            name: 'numeroUm'
        });

        expect(response.body.error).toBe('duplicate name');
    });
    
    it('Alter Stock', async () => {

        var response = await request(app).put('/stock')
        .send({
            name: 'numeroUm'
        });

        expect(response.body.error).toBe('please, send valid token');

        response = await request(app).post('/login')
        .send({
            email: 'alfredo@localhost.com.br',
            password: '123456'
        });

        const {token} = response.body;

    });
    
    it('Delete Stock', async () => {

        var response = await request(app).delete('/stock')
        .send({
            name: 'numeroUm'
        });

        expect(response.body.error).toBe('please, send valid token');

        response = await request(app).post('/login')
        .send({
            email: 'alfredo@localhost.com.br',
            password: '123456'
        });

        const {token} = response.body;

    });

    it('Get Stock', async () => {

        var response = await request(app).get('/stock')
        .send({
            name: 'numeroUm'
        });

        expect(response.body.error).toBe('please, send valid token');

        response = await request(app).post('/login')
        .send({
            email: 'alfredo@localhost.com.br',
            password: '123456'
        });

        const {token} = response.body;

    });


})
